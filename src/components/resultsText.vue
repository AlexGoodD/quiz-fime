<template>
  <div class="results-container">
    <h2>Métricas</h2>
    <p>Número total de personas: {{ props.totalUsers }}</p>
    <p>Número total de respuestas enviadas: {{ props.totalResponses }}</p>
    <div v-for="(question, index) in props.questions" :key="index" class="question-container">
      <h3>{{ question.question }}</h3>
      <ul>
        <li v-for="(response, idx) in question.responses" :key="idx">
          {{ question.options[idx] }}: {{ response }} respuestas
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Question {
  question: string;
  options: string[];
  responses: number[];
}

const props = defineProps<{ 
  questions: Question[],
  totalUsers: number,
  totalResponses: number
}>();
</script>

<style scoped>
.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.question-container {
  text-align: center;
  width: 100%;
}

li {
  list-style: none;
}
</style>