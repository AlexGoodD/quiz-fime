<script setup lang="ts">
  import { currentQuestion, updateAnswer, answers } from '@/services/quizService'

  import MultipleChoiceDisplay from '@/components/questions/MultipleChoice.vue'
  import SliderDisplay from '@/components/questions/SliderSelect.vue'
  import TrueFalseDisplay from '@/components/questions/TrueFalse.vue'
</script>

<template>
  <div>
    <div class="tw-h-[50vh] tw-flex tw-justify-center tw-items-center tw-w-[50rem]">
      <div
        v-if="currentQuestion"
        class="tw-h-[50vh] tw-flex tw-justify-center tw-items-center tw-w-[50rem]"
      >
        <MultipleChoiceDisplay
          v-if="currentQuestion.type === 'multipleChoice'"
          :question="currentQuestion"
          :selected="answers[currentQuestion.position]"
          @select="updateAnswer"
        />
        <SliderDisplay
          v-if="currentQuestion.type === 'slider'"
          :question="currentQuestion.question"
          :min="currentQuestion.min"
          :max="currentQuestion.max"
          :modelValue="answers[currentQuestion.position] as number"
        />
        <TrueFalseDisplay
          v-if="currentQuestion.type === 'trueFalse'"
          :question="currentQuestion.question"
          :modelValue="answers[currentQuestion.position] as string"
        />
      </div>
    </div>
  </div>
</template>
