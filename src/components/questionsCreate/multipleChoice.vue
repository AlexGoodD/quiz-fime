<template>
  <div class="tw-flex tw-items-center tw-gap-10 tw-mb-4">
    <input
        v-model="optionText"
        type="text"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[60%]"
        placeholder="Ingresa una opción"
    />
    <select
        v-model="selectedArea"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-appearance-none" id="area-select"
    >
      <option disabled value="">Selecciona un área</option>
      <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
    </select>
    <input
        v-model.number="points"
        type="number"
        min="0"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[5rem]"
        placeholder="Puntos"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue'

const props = defineProps<{
  areas: string[]
}>()

const emit = defineEmits<{
  (e: 'update', value: { option: string; area: string; points: number }): void
}>()

const optionText = ref('')
const selectedArea = ref('')
const points = ref(0)

// Emitir datos al padre cada vez que cambie algo
watch([optionText, selectedArea, points], () => {
  if (optionText.value && selectedArea.value) {
    emit('update', {
      option: optionText.value,
      area: selectedArea.value,
      points: points.value,
    })
  }
})
</script>

<style scoped>
#area-select {
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 2rem;
  padding-right: 2.5rem;
  max-width: 18rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>