<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-items-center tw-gap-4">
      <label class="tw-font-bold">Verdadero</label>
      <select v-model="trueArea" class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[16rem] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-appearance-none">
        <option disabled value="">Selecciona un área</option>
        <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
      </select>
      <input v-model.number="truePoints" type="number" min="0" class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[6rem]" placeholder="Puntos" />
    </div>
    <div class="tw-flex tw-items-center tw-gap-4">
      <label class="tw-font-bold">Falso</label>
      <select v-model="falseArea" class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[16rem] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-appearance-none">
        <option disabled value="">Selecciona un área</option>
        <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
      </select>
      <input v-model.number="falsePoints" type="number" min="0" class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[6rem]" placeholder="Puntos" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'

defineProps<{ areas: string[] }>()

const emit = defineEmits<{
  (e: 'update', value: { Verdadero: { [area: string]: number }; Falso: { [area: string]: number } }): void
}>()

const trueArea = ref('')
const falseArea = ref('')
const truePoints = ref(0)
const falsePoints = ref(0)

watch([trueArea, falseArea, truePoints, falsePoints], () => {
  emit('update', {
    Verdadero: trueArea.value ? { [trueArea.value]: truePoints.value } : {},
    Falso: falseArea.value ? { [falseArea.value]: falsePoints.value } : {},
  })
})
</script>