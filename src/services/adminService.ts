import { db, auth } from '@/firebase'
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore'
import { Question } from '@/types/QuestionsType'
import { PostgradoType } from '@/types/PosgradoType'

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

function normalize(str: string) {
  return str.trim().toLowerCase()
}
