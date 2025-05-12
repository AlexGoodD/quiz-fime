import { db } from '@/firebase'
import { addDoc, collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore'
import { Question } from '@/types/QuestionsType'

const questionsCollection = collection(db, 'questions')

export async function fetchQuestions(): Promise<Question[]> {
  const snapshot = await getDocs(questionsCollection)

  const preguntas = snapshot.docs.map((doc) => {
    const data = doc.data()

    const base = {
      id: doc.id,
      type: data.type,
      question: data.question,
      position: data.position,
    }

    if (data.type === 'slider') {
      return {
        ...base,
        min: data.min ?? 1,
        max: data.max ?? 5,
        sliderLogics: Array.isArray(data.sliderLogics) ? data.sliderLogics : [],
      }
    }
    /*
        if (data.type === 'multipleChoice') {
          return {
            ...base,
            options: data.options ?? [],
            values: data.values ?? {},
          }
        }

        if (data.type === 'trueFalse') {
          return {
            ...base,
            trueValue: data.trueValue ?? null,
            falseValue: data.falseValue ?? null,
          }
        }*/

    // fallback en caso de que venga un tipo desconocido
    return base
  })

  // ordenar por posición antes de devolver
  return preguntas.sort((a, b) => a.position - b.position) as Question[]
}

export async function saveQuestions(questions: Question[]) {
  const snapshot = await getDocs(questionsCollection)

  const idsActuales = new Set(questions.map((q) => q.id).filter(Boolean))

  // Eliminar preguntas que ya no están
  const eliminaciones = snapshot.docs
    .filter((doc) => !idsActuales.has(doc.id))
    .map((doc) => deleteDoc(doc.ref))

  // Crear o actualizar preguntas
  const actualizaciones = questions.map(async (q, i) => {
    const data: any = {
      type: q.type,
      question: q.question,
      position: i + 1,
    }

    if (q.type === 'slider') {
      data.min = q.min
      data.max = q.max
      data.sliderLogics = q.sliderLogics
    }

    /* if (q.type === 'multipleChoice') {
       data.options = q.options ?? []
       data.values = q.values ?? {}
     }

     if (q.type === 'trueFalse') {
       data.values = q.values ?? { Verdadero: {}, Falso: {} }
     }*/

    if (q.id) {
      return setDoc(doc(db, 'questions', q.id), data)
    } else {
      return addDoc(questionsCollection, data)
    }
  })

  return Promise.all([...eliminaciones, ...actualizaciones])
}
