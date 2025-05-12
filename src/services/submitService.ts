import { auth, db } from '../firebase'
import { AnswerType, Answer } from '@/types/Answer'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { AreaPoints } from '@/types/AreasType'
import type { Question } from '@/types/QuestionsType'
import type { PostgradoType } from '@/types/PosgradoType'

export async function submitAnswers(answers: Answer[]) {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuario no autenticado')

    const posgrado = await calculatePosgradoFromFirestore(answers)

    const answersCollection = collection(db, 'answers')
    await addDoc(answersCollection, {
      userId: user.uid,
      timestamp: new Date().toISOString(),
      answers,
      posgrado,
    })
  } catch (error) {
    console.error('Error enviando respuestas:', error)
    throw error
  }
}

export async function getUserAnswers(): Promise<AnswerType[]> {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuario no autenticado')
    const q = query(collection(db, 'answers'), where('userId', '==', user.uid))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        timestamp: data.timestamp,
        answers: data.answers,
        posgrado: data.posgrado,
      }
    })
  } catch (error) {
    console.error('Error obteniendo respuestas:', error)
    throw error
  }
}

export async function calculatePosgradoFromFirestore(answers: Answer[]): Promise<string> {
  const questionsSnapshot = await getDocs(collection(db, 'questions'))
  const posgradosSnapshot = await getDocs(collection(db, 'posgrados'))

  const questions = questionsSnapshot.docs.map((doc) => doc.data() as Question)
  const posgrados = posgradosSnapshot.docs.map((doc) => doc.data() as PostgradoType)

  const areaPoints: AreaPoints = {}

  for (const answer of answers) {
    const question = questions.find((q) => q.question === answer.question)
    if (!question) continue

    // Múltiple elección o verdadero/falso
    if (question.type === 'multipleChoice' && typeof answer.answer === 'string') {
      const values = question.values[answer.answer]
      if (values) {
        for (const [area, points] of Object.entries(values) as [string, number][]) {
          areaPoints[area] = (areaPoints[area] || 0) + points
        }
      }
    }

    if (question.type === 'trueFalse' && typeof answer.answer === 'string') {
      const values = question.values[answer.answer as 'Verdadero' | 'Falso']
      if (values) {
        for (const [area, points] of Object.entries(values) as [string, number][]) {
          areaPoints[area] = (areaPoints[area] || 0) + points
        }
      }
    }

    // Slider
    if (question.type === 'slider' && typeof answer.answer === 'number') {
      const value = answer.answer
      for (const logic of question.sliderLogics) {
        if (logic.type === 'range') {
          const range = question.max - question.min
          const percentage = (value - question.min) / (range || 1)
          const points = logic.minPoints + percentage * (logic.maxPoints - logic.minPoints)
          areaPoints[logic.area] = (areaPoints[logic.area] || 0) + Math.round(points)
        }
      }
    }
  }

  // Comparación con posgrados
  let closestPosgrado: PostgradoType | null = null
  let minDifference = Infinity

  for (const posgrado of posgrados) {
    if (!posgrado.areaPoints) continue
    let diff = 0
    for (const [area, expected] of Object.entries(posgrado.areaPoints) as [string, number][]) {
      const actual = areaPoints[area] || 0
      diff += Math.abs(actual - expected)
    }

    if (diff < minDifference) {
      minDifference = diff
      closestPosgrado = posgrado
    }
  }

  return closestPosgrado?.name || 'No se encontró un posgrado adecuado'
}
