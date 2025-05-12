import { computed, ref, type Ref, onMounted } from 'vue'
import type { Question, TrueFalseQuestion } from '@/types/QuestionsType'

export function useTrueFalseLogic(questionRef: Ref<Question>) {
  const isTrueFalse = computed(() => questionRef.value.type === 'trueFalse')

  const trueFalseValues = ref<TrueFalseQuestion['values']>({ Verdadero: {}, Falso: {} })

  onMounted(() => {
    if (isTrueFalse.value) {
      const q = questionRef.value as TrueFalseQuestion
      trueFalseValues.value = q.values ?? { Verdadero: {}, Falso: {} }
    }
  })

  function updateTrueFalse(values: TrueFalseQuestion['values']) {
    if (isTrueFalse.value) {
      ;(questionRef.value as TrueFalseQuestion).values = values
      trueFalseValues.value = values
    }
  }

  return {
    isTrueFalse,
    trueFalseValues,
    updateTrueFalse,
  }
}
