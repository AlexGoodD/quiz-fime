<template>
  <div>
    <h1>Resultados</h1>
    <div v-if="userAnswers.length">
      <div v-for="(userAnswer, index) in userAnswers" :key="index">
        <p><strong>Fecha de creación:</strong> {{ new Date(userAnswer.timestamp).toLocaleString() }}</p>
        <div v-for="(answer, idx) in userAnswer.answers" :key="idx">
          <h3>{{ answer.question || 'Pregunta no disponible' }}</h3>
          <p>{{ answer.answer || 'Respuesta no disponible' }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay respuestas disponibles.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserAnswers } from '../services/submitService';
const userAnswers = ref<any[]>([]);
onMounted(async () => {
  const answers = await getUserAnswers();
  userAnswers.value = answers; 
});
</script>