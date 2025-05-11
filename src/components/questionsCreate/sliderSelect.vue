<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-gap-4">
      <input v-model.number="min" type="number" placeholder="Mínimo" class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded" />
      <input v-model.number="max" type="number" placeholder="Máximo" class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded" />
    </div>
    <div class="tw-flex tw-gap-4 tw-items-center">
      <select v-model="selectedArea" class="tw-p-2 tw-pr-10 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[16rem] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-appearance-none">
        <option disabled value="">Selecciona un área</option>
        <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
      </select>
      <input v-model.number="factor" type="number" min="1" class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[6rem]" placeholder="Factor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'

defineProps<{ areas: string[] }>()

const emit = defineEmits<{
  (e: 'update', value: { min: number; max: number; area: string; factor: number }): void
}>()

const min = ref(1)
const max = ref(5)
const selectedArea = ref('')
const factor = ref(1)

watch([min, max, selectedArea, factor], () => {
  if (selectedArea.value) {
    emit('update', {
      min: min.value,
      max: max.value,
      area: selectedArea.value,
      factor: factor.value,
    })
  }
})
</script>