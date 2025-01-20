<template>
  <div>
    <h1>Resultados</h1>
    <div v-if="userAnswers.length">
      <div
        v-for="(userAnswer, index) in userAnswers"
        :key="index"
        class="result-card"
        @click="goToResultPage(userAnswer.id)"
      >
        <p class="result-date">{{ new Date(userAnswer.timestamp).toLocaleString() }}</p>
      </div>
    </div>
    <div v-else>
      <p>No hay respuestas disponibles.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserAnswers } from '../services/submitService';

const userAnswers = ref<any[]>([]);
const router = useRouter();

onMounted(async () => {
  const answers = await getUserAnswers();
  userAnswers.value = answers;
});

function goToResultPage(id: string) {
  router.push(`/result/${id}`);
}
</script>

<style scoped>
.result-card {
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.result-card:hover {
  background-color: #f0f0f0;
}

.result-date {
  font-size: 18px;
  font-weight: bold;
}
</style>