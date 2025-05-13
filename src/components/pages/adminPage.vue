<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-w-[100vw] tw-h-[100%] tw-mr-4">
    <!-- Alineado a la izquierda como las gráficas -->
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-5 tw-pl-[8rem]">Panel de control</h1>

    <div v-if="isAdmin">
      <!-- Contenido principal -->
      <div class="tw-flex tw-pl-[6rem] tw-flex-row tw-items-start tw-w-[100vw] tw-gap-x-8 tw-mb-12">
        <!-- Columna izquierda -->
        <div id="left-items" class="tw-flex tw-flex-col">
          <div class="tw-flex tw-gap-x-4">
            <AdminItem title="Usuarios Registrados" :icon="['fas', 'user']" :result="totalUsers" />
            <AdminItem
              title="Formularios Enviados"
              :icon="['fas', 'file-lines']"
              :result="totalResponses"
            />
          </div>
          <ScaleChart
            v-if="weeklyFormChartData"
            title="Crecimiento Semanal de Formularios"
            :chartData="weeklyFormChartData"
          />
          <CreateItem />
        </div>

        <!-- Columna centro -->
        <div id="center-items" class="tw-flex tw-flex-col">
          <PieChart
            v-if="posgradosChartData"
            title="Distribución de Posgrados"
            :chartData="posgradosChartData"
          />
          <QualityItem title="Calidad de Preguntas" />
        </div>

        <!-- Columna derecha (opcional) -->
        <div id="right-items" class="tw-w-[200px]">
          <TopPosgradoItem title="Top Posgrados Recomendados" :topResults="topPosgrados" />
          <TopAreaItem title="Interés Promedio por Área" :areaScores="areaAverages" />
          <ExportOptionsItem title="Opciones de Exportación" :areaScores="areaAverages" />
        </div>
      </div>
    </div>

    <div v-else>
      <p class="tw-pl-[8rem]">No tienes permisos para ver esta sección.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {
    getMetrics,
    getQuestions,
    getPosgradosWithCounts,
    getDailyFormSubmissions,
    getTopPosgrados,
    getAverageAreaScores,
  } from '@/services/adminService'
  import AdminItem from '@/components/items/adminItem.vue'
  import CreateItem from '@/components/items/createDataItem.vue'
  import TopPosgradoItem from '@/components/items/topPosgradoItem.vue'
  import TopAreaItem from '@/components/items/topAreaItem.vue'
  import PieChart from '@/components/charts/pieAdmin.vue'
  import ScaleChart from '@/components/charts/scaleAdmin.vue'
  import type { Question } from '@/types/QuestionsType'
  import ExportOptionsItem from '@/components/items/exportOptionsItem.vue'
  import QualityItem from '@/components/items/qualityItem.vue'

  const isAdmin = ref(localStorage.getItem('isAdmin') === 'true')
  const totalUsers = ref(0)
  const totalResponses = ref(0)
  const weeklyFormChartData = ref<any>(null)
  const posgradosChartData = ref<{
    labels: string[]
    datasets: { data: number[]; backgroundColor: string[] }[]
  } | null>(null)
  const topPosgrados = ref<{ name: string; count: number }[]>([])
  const areaAverages = ref<{ area: string; average: number }[]>([])
  const questions = ref<Question[]>([])

  onMounted(async () => {
    if (isAdmin.value) {
      const metrics = await getMetrics()
      totalUsers.value = metrics.totalUsers
      totalResponses.value = metrics.totalResponses
      questions.value = (await getQuestions()) as unknown as Question[]
      const posgradosCount = await getPosgradosWithCounts()
      posgradosChartData.value = {
        labels: Object.keys(posgradosCount),
        datasets: [
          {
            data: Object.values(posgradosCount),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      }
      weeklyFormChartData.value = await getDailyFormSubmissions()
      topPosgrados.value = await getTopPosgrados(3)
      areaAverages.value = await getAverageAreaScores()
    }
  })
</script>
