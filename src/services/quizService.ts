import { ref, computed } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import type {
  Question,
  SliderQuestion,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
} from '@/types/QuestionsType'

const questionsCollection = collection(db, 'questions')

const questions = ref<Question[]>([])
const currentIndex = ref(0)
const answers = ref<(number | string | null)[]>([])
const currentQuestion = computed(() => questions.value[currentIndex.value])

export async function loadQuestions() {
  const snapshot = await getDocs(questionsCollection)

  const loaded: Question[] = snapshot.docs.map((doc) => {
    const data = doc.data()
    const base = {
      id: doc.id,
      question: data.question as string,
      position: data.position as number,
      type: data.type as 'slider' | 'multipleChoice' | 'trueFalse',
    }

    if (data.type === 'slider') {
      const slider: SliderQuestion = {
        ...base,
        type: 'slider',
        min: data.min ?? 1,
        max: data.max ?? 5,
        sliderLogics: Array.isArray(data.sliderLogics) ? data.sliderLogics : [],
      }
      return slider
    }

    if (data.type === 'multipleChoice') {
      const mcq: MultipleChoiceQuestion = {
        ...base,
        type: 'multipleChoice',
        options: data.options ?? [],
        values: data.values ?? {},
      }
      return mcq
    }

    if (data.type === 'trueFalse') {
      const tfq: TrueFalseQuestion = {
        ...base,
        type: 'trueFalse',
        values: data.values ?? { Verdadero: {}, Falso: {} },
      }
      return tfq
    }

    throw new Error(`Tipo de pregunta desconocido: ${data.type}`)
  })

  // Ordenar por posición
  questions.value = loaded.sort((a, b) => a.position - b.position)
  answers.value = loaded.map((q) => {
    if (q.type === 'slider') return 1
    return null
  })
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function updateAnswer(value: number | string | null) {
  if (currentQuestion.value.type === 'slider') {
    answers.value[currentIndex.value] = Number(value)
  } else {
    answers.value[currentIndex.value] = value
  }
  //nextQuestion()
}

export {
  questions,
  currentIndex,
  answers,
  currentQuestion,
  nextQuestion,
  prevQuestion,
  updateAnswer,
}
