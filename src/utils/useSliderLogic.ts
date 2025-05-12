import { computed, type Ref } from 'vue'
import type { Question, SliderQuestion } from '@/types/QuestionsType'

export function useSliderLogic(questionRef: Ref<Question>) {
  const isSlider = computed(() => questionRef.value.type === 'slider')

  const sliderData = computed<SliderQuestion | null>(() =>
    isSlider.value ? (questionRef.value as SliderQuestion) : null
  )

  function updateSliderConfig(data: {
    min: number
    max: number
    sliderLogics: SliderQuestion['sliderLogics']
  }) {
    if (isSlider.value && sliderData.value) {
      sliderData.value.min = data.min
      sliderData.value.max = data.max
      sliderData.value.sliderLogics = data.sliderLogics
    }
  }

  return {
    isSlider,
    sliderData,
    updateSliderConfig,
  }
}
