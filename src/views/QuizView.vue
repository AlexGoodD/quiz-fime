<template>
  <div class="quiz-container">
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="question-counter">
      Pregunta {{ currentIndex + 1 }} de {{ questions.length }}
    </div>
    <Quiz />
    <div class="navigation-buttons">
      <button v-if="currentIndex == 0" @click="prevQuestion" class="disabled-button">
        Anterior
      </button>
      <button v-else @click="prevQuestion">
        Anterior
      </button>
      <button v-if="currentIndex < questions.length - 1" @click="nextQuestion">
        Siguiente
      </button>
      <button v-else @click="handleSubmitAnswers">Enviar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Quiz from "../components/pages/QuizPage.vue";
import {
  nextQuestion,
  prevQuestion,
  submitAnswers,
  questions,
  currentIndex,
} from "@/services/quizService";
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const progress = computed(
  () => ((currentIndex.value + 1) / questions.value.length) * 100
);
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
.disabled-button{
  background-color: #212122;
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.question-counter {
  position: absolute;
  top: 5rem;
  right: 3rem;
  font-size: 1.3rem;
  font-weight: bold;
}
@media (max-width: 750px) {
  .question-counter {
    font-size: 1rem;
    top: 1rem;
    right: 1rem;
  }
}

.progress-bar-container {
  display: block;
  justify-content: center;
  width: 50vw;
  height: 20px;
  background-color: #c6c6c6;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

@media (max-height: 500px) {
  .progress-bar-container {
    bottom: 30px;
  }
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
}

.progress-bar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 20px;
  animation: move 1s linear infinite;
}

@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 20px 20px;
  }
}
</style>
