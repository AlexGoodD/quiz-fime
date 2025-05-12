<script setup lang="ts">
  import { updateAnswer, currentIndex, currentQuestion, answers } from '@/services/quizService'
  import Slider from '@/components/questions/SliderSelect.vue'
  import TrueFalse from '@/components/questions/TrueFalse.vue'
  import MultOptions from '@/components/questions/MultOptions.vue'

  function getComponent(type: string) {
    switch (type) {
      case 'slider':
        return Slider
      case 'trueFalse':
        return TrueFalse
      case 'multipleChoice':
        return MultOptions
      default:
        return null
    }
  }
</script>

<template>
  <div>
    <div class="tw-h-[50vh] tw-flex tw-justify-center tw-items-center tw-w-[50rem]">
      <component
        :is="getComponent(currentQuestion.type)"
        :question="currentQuestion.question"
        :options="currentQuestion.options"
        :min="currentQuestion.min"
        :max="currentQuestion.max"
        v-model="answers[currentIndex]"
        @update:modelValue="updateAnswer"
      />
    </div>
  </div>
</template>
