<template>
  <div>
    <h1>Resultados</h1>
    <div class="results-container">
      <div v-if="userAnswers.length" class="results-grid">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUserAnswers } from "../services/submitService";

interface UserAnswer {
  id: string;
  timestamp: string;
}

const userAnswers = ref<UserAnswer[]>([]);
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
.results-container {
  width: 80%;
}
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
.result-card {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  width: 150px;
  height: 150px;
}

.result-card:hover {
  transform: scale(1.05);
}

.result-date {
  font-size: 18px;
  font-weight: bold;
}
</style>
