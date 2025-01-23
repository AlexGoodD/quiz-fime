<template>
    <div>
      <h2>Métricas</h2>
      <p>Número total de personas: {{ totalUsers }}</p>
      <p>Número total de respuestas enviadas: {{ totalResponses }}</p>
      <div v-for="(question, index) in questions" :key="index">
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
  </style>