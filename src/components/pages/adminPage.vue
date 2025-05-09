<template>
  <div class="admin-container">
    <h1>Panel de control</h1>

    <div v-if="isAdmin">
      <div class="download-button">
        <button class="btn-dwn">Descargar resultados</button>
      </div>
      <div class="items-grid">
        <itemAdmin title="Usuarios registrados" :result="totalUsers" />
        <itemAdmin title="Formularios respondidos" :result="totalResponses" />
        <itemChartAdmin
          v-if="posgradosChartData"
          title="Distribución de Posgrados"
          :chartData="posgradosChartData"
        />
      </div>
      <router-link to="/admin/questions" title="Panel de control">
        texto
      </router-link>
    </div>
    <div v-else>
      <p>No tienes permisos para ver esta sección.</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getMetrics,
  getQuestions,
  getPosgradosWithCounts,
} from "@/services/adminService";
import itemAdmin from "../itemAdmin.vue";
import itemChartAdmin from "../charts/itemChartAdmin.vue";
import {ChartPieIcon} from "@heroicons/vue/24/outline";

const isAdmin = ref(localStorage.getItem("isAdmin") === "true");
const totalUsers = ref(0);
const totalResponses = ref(0);
const posgradosChartData = ref<{
  labels: string[];
  datasets: { data: number[]; backgroundColor: string[] }[];
} | null>(null);

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
    questions.value = (await getQuestions()) as Question[];

    const posgradosCount = await getPosgradosWithCounts();
    posgradosChartData.value = {
      labels: Object.keys(posgradosCount),
      datasets: [
        {
          data: Object.values(posgradosCount),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  }
});
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

.items-grid {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

@media (max-width: 760px) {
  .items-grid {
    flex-direction: column;
  }
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #000000;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.5s ease;
  margin-bottom: 20px;
}

button:hover {
  background-color: #3f3f3f;
}
.btn-dwn {
  width: 50%;
}

@media (max-width: 760px) {
  .btn-dwn {
    width: 100%;
  }
}
</style>
