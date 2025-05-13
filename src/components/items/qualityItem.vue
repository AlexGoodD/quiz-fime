<template>
  <div
    class="tw-flex tw-flex-col tw-justify-start tw-w-[18rem] tw-h-[26.5rem] tw-border tw-border-[#ccc] tw-shadow-lg tw-text-left tw-m-3 tw-my-8 tw-rounded-3xl tw-px-4 tw-py-5"
  >
    <div class="tw-flex tw-items-center tw-justify-center tw-mb-4">
      <h3 class="tw-text-lg tw-font-medium">{{ title }}</h3>
    </div>

    <!-- Scroll solo para preguntas -->
    <div class="tw-overflow-y-auto tw-flex-1 tw-pr-1">
      <div
        v-for="item in questionQualities"
        :key="item.question"
        class="tw-p-3 tw-mb-2 tw-rounded-lg"
        :class="{
          'tw-bg-green-100': item.quality === 'Alta',
          'tw-bg-yellow-100': item.quality === 'Media',
          'tw-bg-red-100': item.quality === 'Baja',
        }"
      >
        <p class="tw-text-sm tw-font-medium">{{ item.question }}</p>
        <p class="tw-text-xs tw-text-gray-600">Calidad: {{ item.quality }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { getQuestionQualities } from '@/services/adminService'

  defineProps<{ title: string }>()

  const questionQualities = ref<{ question: string; quality: string }[]>([])

  onMounted(async () => {
    questionQualities.value = await getQuestionQualities()
  })
</script>
