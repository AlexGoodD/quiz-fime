<template>
  <div>
    <div class="question-container">
      <component
        :is="getComponent(currentQuestion.type)"
        :question="currentQuestion.question"
        :options="currentQuestion.options"
        v-model="answers[currentIndex]"
        @update:modelValue="updateAnswer"
      />
    </div>
    <div class="navigation-buttons">
      <button @click="prevQuestion" :disabled="currentIndex === 0">Anterior</button>
      <button v-if="currentIndex < questions.length - 1" @click="nextQuestion">Siguiente</button>
      <button v-else @click="handleSubmitAnswers">Enviar Respuestas</button>
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

async function handleSubmitAnswers() {
  await submitAnswers(router);
}
</script>


<style scoped>
.question-container {
  background-color: #b3d9ff;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>