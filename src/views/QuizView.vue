<template>
  <div class="quiz-container">
    <div class="question-counter">
      Pregunta {{ currentIndex + 1 }} de {{ questions.length }}
    </div>
    <Quiz />
    <div class="navigation-buttons">
      <button v-if="currentIndex < questions.length - 1" @click="nextQuestion">Siguiente</button>
      <button v-else @click="handleSubmitAnswers">Enviar</button>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import Quiz from '../components/QuizPage.vue';
import { nextQuestion, prevQuestion, submitAnswers, questions, currentIndex } from '../services/quizService';
import { useRouter } from 'vue-router';
const router = useRouter();
async function handleSubmitAnswers() {
  await submitAnswers(router);
}
</script>

<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.navigation-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 50px;
}
button {
  height: 40px;
  font-size: 15px;
  width: 100%;
  padding: 10px 20px;
  border: none;
  background-color: #212122;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  transition: transform 0.5s ease;
}
button:hover {
  transform: scale(1.1);
}
button:disabled {
  background-color: #212122;
  opacity: 0.5;
  cursor: not-allowed;
}
.question-counter {
  position: absolute;
  top: 5rem;
  right: 3rem;
  font-size: 1.3rem;
  font-weight: bold;
}
</style>