<template>
  <div class="quiz-container">
    <Quiz />
  </div>
</template>

<script setup lang="ts">
import Quiz from '../components/QuizPage.vue';
</script>

<style scoped>
.quiz-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 1rem;
}
</style>