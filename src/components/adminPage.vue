<template>
  <div class="admin-container">
    <h1>Admin Dashboard</h1>
    
    <div v-if="isAdmin">
      <button @click="toggleView" class="toggle-button">
      {{ showText ? 'Ver Gráficas' : 'Ver Métricas' }}
    </button>
      <ResultsText v-if="showText" :questions="questions" :totalUsers="totalUsers" :totalResponses="totalResponses" />
      <ResultsChart v-else :questions="questions" />
    </div>
    <div v-else>
      <p>No tienes permisos para ver esta sección.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMetrics, getQuestions } from '../services/adminService';
import ResultsText from './resultsText.vue';
import ResultsChart from './resultsChart.vue';

const isAdmin = ref(localStorage.getItem('isAdmin') === 'true');
const totalUsers = ref(0);
const totalResponses = ref(0);
const showText = ref(true);

interface Question {
  question: string;
  options: string[];
  responses: number[];
}

const questions = ref<Question[]>([]);

onMounted(async () => {
  if (isAdmin.value) {
    const metrics = await getMetrics();
    totalUsers.value = metrics.totalUsers;
    totalResponses.value = metrics.totalResponses;
    questions.value = await getQuestions() as Question[];
  }
});

function toggleView() {
  showText.value = !showText.value;
}
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.toggle-button {
  position: absolute;
  right: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 10%;
}

.toggle-button:hover {
  background-color: #0056b3;
}
</style>