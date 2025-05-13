<template>
  <div
    class="tw-flex tw-flex-col tw-justify-start tw-w-[25rem] tw-h-[13rem] tw-border tw-border-[#ccc] tw-shadow-lg tw-text-left tw-m-3 tw-my-8 tw-rounded-3xl tw-px-4 tw-py-5"
  >
    <!-- Título fijo arriba -->
    <div class="tw-flex tw-items-center tw-justify-center tw-mb-4">
      <h3 class="tw-text-lg tw-font-medium">{{ props.title }}</h3>
    </div>

    <div class="tw-flex tw-justify-between tw-px-4 tw-py-2">
      <div
        class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-transition tw-transform tw-duration-500 hover:tw-scale-105"
      >
        <button
          class="tw-text-gray-600 tw-flex tw-w-8 tw-text-4xl tw-p-1 tw-items-center tw-justify-center"
        >
          <font-awesome-icon :icon="['fas', 'file-lines']" />
        </button>
        <p class="tw-text-sm tw-text-center tw-mt-1">
          <span class="tw-block">Exportar</span>
          <span class="tw-block">Cuestionarios</span>
        </p>
      </div>
      <div
        class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-transition tw-transform tw-duration-500 hover:tw-scale-105"
      >
        <button
          class="tw-text-gray-600 tw-flex tw-w-8 tw-text-4xl tw-p-1 tw-items-center tw-justify-center"
        >
          <font-awesome-icon :icon="['fas', 'chart-simple']" />
        </button>
        <p class="tw-text-sm tw-text-center tw-mt-1">
          <span class="tw-block">Exportar</span>
          <span class="tw-block">Gráficas</span>
        </p>
      </div>
      <div
        class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-transition tw-transform tw-duration-500 hover:tw-scale-105"
      >
        <button
          class="tw-text-gray-600 tw-flex tw-w-8 tw-text-4xl tw-p-1 tw-items-center tw-justify-center"
        >
          <font-awesome-icon :icon="['fas', 'file-csv']" />
        </button>
        <p class="tw-text-sm tw-text-center tw-mt-1">
          <span class="tw-block">Exportar</span>
          <span class="tw-block">CSV</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps<{
    title: string
    areaScores: { area: string; average: number }[]
  }>()
</script>
