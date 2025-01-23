<template>
  <div>
    <div class="question-container">
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

<script setup lang="ts">
import { nextQuestion, prevQuestion, updateAnswer, submitAnswers, questions, currentIndex, currentQuestion, answers } from '../services/quizService';
import Slider from '../components/SliderSelect.vue';
import TrueFalse from '../components/TrueFalse.vue';
import MultOptions from '../components/MultOptions.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function getComponent(type: string) {
  switch (type) {
    case 'slider':
      return Slider;
    case 'trueFalse':
      return TrueFalse;
    case 'multipleChoice':
      return MultOptions;
    default:
      return null;
  }
}
</script>

<style scoped>
.question-container {
  border-radius: 10px;
  width: 80vw; 
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>