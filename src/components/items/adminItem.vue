<template>
  <div
    class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-w-[15rem] tw-h-[8rem] tw-border tw-border-[#ccc] tw-shadow-lg tw-text-center tw-m-3 tw-rounded-3xl tw-px-4 tw-py-5"
  >
    <div class="tw-flex tw-items-center tw-gap-5 tw-mb-1 tw-text-left">
      <font-awesome-icon :icon="props.icon" class="tw-ml-4 tw-text-3xl tw-text-gray-700" />
      <h3 class="tw-text-lg tw-font-medium tw-m-0">{{ props.title }}</h3>
    </div>
    <p class="tw-text-3xl tw-font-bold">{{ props.result }}</p>
  </div>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps<{
    title: string
    result: number | string
    icon: [string, string]
  }>()
</script>
