import { db, auth } from '@/firebase'
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore'
import { Question } from '@/types/QuestionsType'
import { format, subDays, isSameDay } from 'date-fns'
import { PostgradoType } from '@/types/PosgradoType'
import { es } from 'date-fns/locale'

export async function getMetrics() {
  const usersSnapshot = await getDocs(collection(db, 'users'))
  const answersSnapshot = await getDocs(collection(db, 'answers'))

  return {
    totalUsers: usersSnapshot.size,
    totalResponses: answersSnapshot.size,
  }
}

function initializeSliderQuestion(question) {
  const responses = Array(question.max - question.min + 1).fill(0)
  return {
    question: question.question,
    options: Array.from({ length: question.max - question.min + 1 }, (_, i) =>
      (i + question.min).toString()
    ),
    responses: responses,
  }
}

function initializeTrueFalseQuestion(question) {
  return {
    question: question.question,
    options: ['Verdadero', 'Falso'],
    responses: [0, 0],
  }
}

function intializeMultipleChoiceQuestion(question) {
  return {
    question: question.question,
    options: question.options,
    responses: question.options.map(() => 0),
  }
}

export async function getQuestions() {
  const answersSnapshot = await getDocs(collection(db, 'answers'))
  const answers = answersSnapshot.docs.map((doc) => doc.data())

  const questionsSnapshot = await getDocs(collection(db, 'questions'))
  const questions = questionsSnapshot.docs.map((doc) => doc.data() as Question)

  const questionMap = questions.reduce(
    (acc, question) => {
      const key = normalize(question.question)
      if (question.type === 'slider') {
        acc[key] = initializeSliderQuestion(question)
      } else if (question.type === 'trueFalse') {
        acc[key] = initializeTrueFalseQuestion(question)
      } else {
        acc[key] = intializeMultipleChoiceQuestion(question)
      }
      return acc
    },
    {} as Record<string, { question: string; options: string[]; responses: number[] }>
  )

  answers.forEach((answerDoc) => {
    answerDoc.answers.forEach(
      (answer: { question: string; answer: string | number | null | undefined }) => {
        if (!answer || answer.answer == null || answer.question == null) return

        const key = normalize(answer.question)
        const question = questionMap[key]

        if (question) {
          const answerStr = answer.answer.toString()
          const optionIndex = question.options.indexOf(answerStr)
          if (optionIndex !== -1) {
            question.responses[optionIndex]++
          }
        }
      }
    )
  })

  return Object.values(questionMap)
}

export async function getPosgradosWithCounts() {
  const posgradosSnapshot = await getDocs(collection(db, 'posgrados'))
  const posgrados = posgradosSnapshot.docs.map((doc) => doc.data() as PostgradoType)

  const posgradosCount: Record<string, number> = {}
  posgrados.forEach((pos) => {
    posgradosCount[pos.name] = 0
  })

  const answersSnapshot = await getDocs(collection(db, 'answers'))
  answersSnapshot.forEach((doc) => {
    const data = doc.data()
    const posgrado = data.posgrado
    if (posgradosCount[posgrado] !== undefined) {
      posgradosCount[posgrado]++
    }
  })

  return posgradosCount
}

export function subscribeToUserAuth(callback: (isAdmin: boolean) => void) {
  const user = auth.currentUser
  if (user) {
    const userDocRef = doc(db, 'users', user.uid)
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data()
        const isAdmin = userData.isAdmin
        localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false')
        callback(isAdmin)
      }
    })
    return unsubscribe
  }
  return null
}

export async function getDailyFormSubmissions() {
  const answersSnapshot = await getDocs(collection(db, 'answers'))
  const allAnswers = answersSnapshot.docs.map((doc) => doc.data())

  // Generar array con los últimos 7 días (de hoy hacia atrás)
  const today = new Date()
  const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(today, i))

  // Inicializar mapa con 0 envíos por día
  const dayCounts: Record<string, number> = {}

  last7Days.forEach((date) => {
    const label = format(date, 'EEE', { locale: es }) // ej: "lun", "mar"
    dayCounts[label] = 0
  })

  // Contar respuestas por día
  allAnswers.forEach((entry) => {
    const ts = entry.timestamp
    if (!ts) return

    const date = ts.toDate ? ts.toDate() : new Date(ts)

    last7Days.forEach((refDate) => {
      if (isSameDay(date, refDate)) {
        const label = format(refDate, 'EEE', { locale: es })
        dayCounts[label]++
      }
    })
  })

  const labels = last7Days.map((d) => format(d, 'EEE', { locale: es }))

  return {
    labels,
    datasets: [
      {
        label: 'Formularios enviados',
        data: labels.map((label) => dayCounts[label]),
        borderColor: '#3366FF',
        backgroundColor: 'rgba(51, 102, 255, 0.2)',
        tension: 0.3,
      },
    ],
  }
}

export async function getTopPosgrados(limit: number = 3) {
  const posgradosSnapshot = await getDocs(collection(db, 'posgrados'))
  const posgrados = posgradosSnapshot.docs.map((doc) => doc.data())

  const posgradosCount: Record<string, number> = {}
  posgrados.forEach((pos) => {
    posgradosCount[pos.name] = 0
  })

  const answersSnapshot = await getDocs(collection(db, 'answers'))
  answersSnapshot.forEach((doc) => {
    const data = doc.data()
    const posgrado = data.posgrado
    if (posgradosCount[posgrado] !== undefined) {
      posgradosCount[posgrado]++
    }
  })

  const sorted = Object.entries(posgradosCount)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))

  // Rellenar con vacíos si hay menos que el límite
  while (sorted.length < limit) {
    sorted.push({ name: '', count: 0 })
  }

  return sorted.slice(0, limit)
}

export async function getAverageAreaScores() {
  const answersSnapshot = await getDocs(collection(db, 'answers'))
  const allAnswers = answersSnapshot.docs.map((doc) => doc.data())

  const questionsSnapshot = await getDocs(collection(db, 'questions'))
  const questions = questionsSnapshot.docs.map((doc) => doc.data() as Question)

  const areaTotals: Record<string, number> = {}
  const areaCounts: Record<string, number> = {}

  for (const answerDoc of allAnswers) {
    for (const response of answerDoc.answers) {
      const question = questions.find((q) => normalize(q.question) === normalize(response.question))
      if (!question || response.answer == null) continue

      let valuesMap: Record<string, number> | null = null

      if (question.type === 'multipleChoice' && question.values) {
        valuesMap = question.values[response.answer as string] || null
      } else if (question.type === 'trueFalse' && question.values) {
        valuesMap = question.values[response.answer as string] || null
      } else if (question.type === 'slider' && question.sliderLogics) {
        valuesMap = {}
        for (const logic of question.sliderLogics) {
          if (
            logic.type === 'range' &&
            response.answer >= logic.minPoints &&
            response.answer <= logic.maxPoints
          ) {
            valuesMap[logic.area] = (valuesMap[logic.area] || 0) + logic.maxPoints
          }
        }
      }

      // ✅ SOLO ACUMULAR ÁREAS SI LA RESPUESTA LAS TOCÓ
      if (valuesMap && Object.keys(valuesMap).length > 0) {
        for (const [area, value] of Object.entries(valuesMap)) {
          areaTotals[area] = (areaTotals[area] || 0) + value
          areaCounts[area] = (areaCounts[area] || 0) + 1
        }
      }
    }
  }

  const averages = Object.entries(areaTotals).map(([area, total]) => {
    const count = areaCounts[area]
    return {
      area,
      average: parseFloat((total / count).toFixed(2)),
    }
  })

  // Solo áreas con valor real y relevante
  return averages.filter((a) => a.average > 0)
}

export async function getQuestionQualities() {
  const questionData = await getQuestions()

  return questionData.map((q) => {
    const total = q.responses.reduce((a, b) => a + b, 0)
    const max = Math.max(...q.responses)
    const ratio = total ? max / total : 1

    let quality: 'Alta' | 'Media' | 'Baja' = 'Alta'
    if (ratio > 0.8) quality = 'Baja'
    else if (ratio > 0.5) quality = 'Media'

    return {
      question: q.question,
      quality,
    }
  })
}

function normalize(str: string) {
  return str.trim().toLowerCase()
}
