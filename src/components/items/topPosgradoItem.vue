<template>
  <div
    class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-w-[25rem] tw-h-[15rem] tw-border tw-border-[#ccc] tw-shadow-lg tw-text-center tw-m-3 tw-rounded-3xl tw-px-4 tw-py-5"
  >
    <div class="tw-flex tw-items-center tw-gap-5 tw-mb-1 tw-text-left">
      <h3 class="tw-text-lg tw-font-medium tw-m-0">{{ props.title }}</h3>
    </div>
    <div
      v-for="(result, index) in props.topResults"
      :key="index"
      class="tw-flex tw-justify-between tw-items-center tw-text-left tw-w-full tw-p-2 tw-border-b"
    >
      <span class="tw-text-base tw-font-black">
        {{ index + 1 }}
      </span>
      <span class="tw-text-sm tw-font-medium tw-truncate tw-overflow-hidden tw-w-[18rem]">{{
        result.name
      }}</span>
      <span class="tw-text-sm tw-font-bold">{{ result.count }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps<{
    title: string
    topResults: { name: string; count: number }[]
  }>()
</script>
