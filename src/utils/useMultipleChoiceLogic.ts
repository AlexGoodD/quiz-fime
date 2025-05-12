import { ref } from 'vue'
import type { MultipleChoiceQuestion } from '@/types/QuestionsType'

export function useMultipleChoiceLogic(questionData: { value: MultipleChoiceQuestion }) {
  const multipleOptions = ref<Array<{ option: string; areaPoints: Record<string, number> }>>([])

  function initialize() {
    questionData.value.options ??= []
    questionData.value.values ??= {}

    multipleOptions.value = questionData.value.options.map((option) => ({
      option,
      areaPoints: questionData.value.values[option] ?? {},
    }))
  }

  function sync() {
    questionData.value.options = []
    questionData.value.values = {}

    for (const opt of multipleOptions.value) {
      if (opt.option) {
        questionData.value.options.push(opt.option)
        questionData.value.values[opt.option] = opt.areaPoints
      }
    }
  }

  return {
    multipleOptions,
    initialize,
    sync,
    addOption: () => multipleOptions.value.push({ option: '', areaPoints: {} }),
    updateOption: (i: number, data: any) => {
      multipleOptions.value[i] = data
      sync()
    },
    removeOption: (i: number) => {
      multipleOptions.value.splice(i, 1)
      sync()
    },
  }
}
