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
      class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-appearance-none"
      id="area-select"
    >
      <option disabled value="">Selecciona un área</option>
      <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
    </select>
    <template v-if="selectedArea !== ''">
      <input
        v-model.number="points"
        type="number"
        class="tw-p-2 tw-border tw-rounded"
        placeholder="Puntos"
      />
      <button @click="emit('delete')" title="Eliminar opción">
        <font-awesome-icon icon="trash" class="tw-text-red-400 hover:tw-text-red-600" />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, defineProps, defineEmits, onMounted } from 'vue'

  const props = defineProps<{
    areas: string[]
    modelValue?: { option: string; areaPoints: Record<string, number> }
  }>()

  const emit = defineEmits<{
    (e: 'update', value: { option: string; areaPoints: { [area: string]: number } }): void
    (e: 'delete'): void
  }>()

  const optionText = ref('')
  const selectedArea = ref('')
  const areaPoints = ref<Record<string, number>>({}) // area -> puntos

  // Computed para acceder/modificar puntos actuales del área seleccionada
  const points = computed({
    get: () => areaPoints.value[selectedArea.value] ?? 0,
    set: (val) => {
      if (selectedArea.value) {
        areaPoints.value[selectedArea.value] = val
      }
    },
  })

  // Emitir actualización cada vez que cambien los datos relevantes
  watch(
    [optionText, areaPoints],
    () => {
      if (optionText.value) {
        emit('update', {
          option: optionText.value,
          areaPoints: { ...areaPoints.value },
        })
      }
    },
    { deep: true }
  )

  onMounted(() => {
    if (props.modelValue) {
      optionText.value = props.modelValue.option
      areaPoints.value = { ...props.modelValue.areaPoints }

      // Si hay al menos un área ya asignada, la seleccionamos por defecto
      const firstAssigned = Object.keys(props.modelValue.areaPoints)[0]
      if (firstAssigned) {
        selectedArea.value = firstAssigned
      }
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
