<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[100%] tw-h-[100%]">
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-10">Panel de control</h1>

    <div v-if="isAdmin">
      <div class="tw-flex tw-justify-center">
        <button
          class="tw-flex tw-items-center tw-justify-center tw-w-[20rem] tw-h-[3rem] tw-p-4 tw-border-none tw-bg-black tw-text-white tw-rounded-md tw-cursor-pointer tw-text-lg tw-transition-colors tw-mb-5 tw-duration-500 hover:tw-bg-[#3f3f3f]"
        >
          Descargar resultados
        </button>
      </div>
      <div class="tw-flex tw-flex-grid tw-items-center tw-justify-center tw-w-[100%] tw-h-[100%]">
        <AdminItem title="Usuarios registrados" :result="totalUsers" />
        <AdminItem title="Formularios respondidos" :result="totalResponses" />
        <ChartAdmin
          v-if="posgradosChartData"
          title="Distribución de Posgrados"
          :chartData="posgradosChartData"
        />
      </div>
      <router-link to="/admin/questions" title="Panel de control"> Preguntas</router-link>
      <router-link to="/admin/postgrados" title="Panel de control"> Postgrados</router-link>
    </div>
    <div v-else>
      <p>No tienes permisos para ver esta sección.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { getMetrics, getQuestions, getPosgradosWithCounts } from '@/services/adminService'
  import AdminItem from '@/components/items/adminItem.vue'
  import ChartAdmin from '@/components/charts/chartAdmin.vue'

  const isAdmin = ref(localStorage.getItem('isAdmin') === 'true')
  const totalUsers = ref(0)
  const totalResponses = ref(0)
  const posgradosChartData = ref<{
    labels: string[]
    datasets: { data: number[]; backgroundColor: string[] }[]
  } | null>(null)

  interface Question {
    question: string
    options: string[]
    responses: number[]
  }

  const questions = ref<Question[]>([])

  onMounted(async () => {
    if (isAdmin.value) {
      const metrics = await getMetrics()
      totalUsers.value = metrics.totalUsers
      totalResponses.value = metrics.totalResponses
      questions.value = (await getQuestions()) as Question[]

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
    }
  })
</script>
