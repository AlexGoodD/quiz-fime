<template>
  <div
    class="tw-flex tw-flex-col tw-justify-start tw-w-[25rem] tw-h-[15rem] tw-border tw-border-[#ccc] tw-shadow-lg tw-text-left tw-m-3 tw-my-8 tw-rounded-3xl tw-px-4 tw-py-5"
  >
    <!-- Título fijo arriba -->
    <div class="tw-flex tw-items-center tw-justify-center tw-mb-4">
      <h3 class="tw-text-lg tw-font-medium">{{ props.title }}</h3>
    </div>

    <!-- Contenedor scrollable SOLO para áreas -->
    <div class="tw-overflow-y-auto tw-overflow-x-hidden tw-pr-1 tw-flex-1">
      <div
        v-for="area in props.areaScores"
        :key="area.area"
        class="tw-flex tw-items-center tw-w-[23rem] tw-mb-3"
      >
        <!-- Nombre del área -->
        <div class="tw-text-sm tw-w-[10rem] tw-text-gray-700 tw-truncate tw-overflow-hidden">
          {{ area.area }}
        </div>

        <!-- Barra de progreso -->
        <div class="tw-relative tw-flex-1 tw-h-3 tw-rounded-full tw-bg-gray-300 tw-mr-4">
          <div
            class="tw-absolute tw-left-0 tw-top-0 tw-h-3 tw-rounded-full tw-bg-blue-500"
            :style="{ width: `${(area.average / maxScore) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue'

  const props = defineProps<{
    title: string
    areaScores: { area: string; average: number }[]
  }>()

  const maxScore = computed(() => Math.max(...props.areaScores.map((a) => a.average), 1))
</script>
