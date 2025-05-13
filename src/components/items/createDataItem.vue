<template>
  <div
    class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-7 tw-w-[32rem] tw-m-4 tw-h-[20rem] tw-border tw-border-[#ccc] tw-shadow-lg tw-text-center tw-rounded-3xl tw-p-10"
  >
    <router-link
      to="/admin/questions"
      class="tw-flex tw-w-[100%] tw-p-2 tw-rounded-lg tw-border tw-bg-gray-200 tw-items-center tw-transition tw-transform tw-duration-500 hover:tw-bg-gray-300 hover:tw-cursor-pointer hover:-tw-translate-y-2"
    >
      <font-awesome-icon :icon="['fas', 'plus']" class="tw-ml-2 tw-mr-4" />
      Crear nueva pregunta
    </router-link>
    <router-link
      to="/admin/postgrados"
      class="tw-flex tw-w-[100%] tw-p-2 tw-rounded-lg tw-border tw-bg-gray-200 tw-items-center tw-transition tw-transform tw-duration-500 hover:tw-bg-gray-300 hover:tw-cursor-pointer hover:-tw-translate-y-2"
    >
      <font-awesome-icon :icon="['fas', 'plus']" class="tw-ml-2 tw-mr-4" />
      Crear nuevo posgrado
    </router-link>
    <button
      @click="importData"
      class="tw-flex tw-w-[100%] tw-p-2 tw-rounded-lg tw-border tw-bg-gray-200 tw-items-center tw-transition tw-transform tw-duration-500 hover:tw-bg-gray-300 hover:tw-cursor-pointer hover:-tw-translate-y-2"
    >
      <font-awesome-icon :icon="['fas', 'file-import']" class="tw-ml-2 tw-mr-4" />
      Importar información
    </button>
  </div>
</template>
<script setup lang="ts">
  import { importDefaultData } from '@/utils/importDefaultData'

  async function importData() {
    importDefaultData()
  }
</script>
