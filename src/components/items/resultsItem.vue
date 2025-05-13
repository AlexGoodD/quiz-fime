<template>
  <div
    class="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border tw-border-[#ccc] tw-rounded-xl tw-h-[8rem] tw-px-[1rem]"
  >
    <font-awesome-icon
      :icon="['fas', 'file-lines']"
      class="tw-bg-gray-200 tw-p-4 tw-rounded-lg tw-w-[2rem] tw-h-[2rem]"
    />
    <div class="tw-flex tw-flex-col tw-text-left">
      <p class="tw-text-lg">
        {{ formattedTimestamp }}
      </p>
      <p class="tw-text-lg tw-font-medium tw-truncate tw-w-[20rem]">{{ posgrado }}</p>
      <p>{{ answeredQuestions }} preguntas respondidas</p>
    </div>
    <button
      class="tw-bg-gray-200 tw-py-2 tw-px-8 tw-rounded-lg tw-font-medium tw-transition-colors tw-duration-500 hover:tw-bg-gray-300"
      @click="$emit('view-details', id)"
    >
      Ver detalles
    </button>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    timestamp: String,
    id: String,
    posgrado: String,
    answeredQuestions: Number,
  })
  const formattedTimestamp = computed(() => {
    const date = new Date(props.timestamp)
    if (isNaN(date.getTime())) return 'Fecha inválida'

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return date.toLocaleDateString('es-ES', options).replace(',', '')
  })
</script>
