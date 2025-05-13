import { db } from '@/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { areas } from './areasData'
import { posgrados } from './posgradosData'
import { questions } from './questionsData'

export async function importDefaultData() {
  try {
    // Importar áreas
    const areasCollection = collection(db, 'areas')
    for (const area of areas) {
      await addDoc(areasCollection, {
        ...area,
        createdAt: serverTimestamp(),
      })
    }
    console.log('Áreas importadas correctamente.')

    // Importar posgrados
    const posgradosCollection = collection(db, 'posgrados')
    for (const posgrado of posgrados) {
      await addDoc(posgradosCollection, posgrado)
    }
    console.log('Posgrados importados correctamente.')

    // Importar preguntas
    const questionsCollection = collection(db, 'questions')
    for (const question of questions) {
      await addDoc(questionsCollection, question)
    }
    console.log('Preguntas importadas correctamente.')
  } catch (error) {
    console.error('Error al importar datos:', error)
  }
}
