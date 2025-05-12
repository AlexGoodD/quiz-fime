<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-gap-4">
      <input
        v-model.number="min"
        type="number"
        placeholder="Mínimo"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded"
      />
      <input
        v-model.number="max"
        type="number"
        placeholder="Máximo"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded"
      />
    </div>
    <label class="tw-font-bold">Asigna puntos por área</label>

    <div class="tw-flex tw-flex-col tw-gap-4">
      <div class="tw-flex tw-gap-4 tw-items-center">
        <select
          v-model="selectedArea"
          class="tw-p-2 tw-pr-10 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[16rem] tw-appearance-none"
        >
          <option disabled value="">Selecciona un área</option>
          <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
        </select>

        <template v-if="selectedArea !== ''">
          <input
            v-model.number="minPoints"
            type="number"
            class="tw-p-2 tw-border tw-rounded"
            placeholder="Puntos mínimos"
          />
          <input
            v-model.number="maxPoints"
            type="number"
            class="tw-p-2 tw-border tw-rounded"
            placeholder="Puntos máximos"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, defineEmits, onMounted } from 'vue'

  const props = defineProps<{
    areas: string[]
    min?: number
    max?: number
    sliderLogics?: {
      type: 'range'
      area: string
      minPoints: number
      maxPoints: number
    }[]
  }>()

  const emit = defineEmits<{
    (
      e: 'update',
      value: {
        min: number
        max: number
        sliderLogics: {
          type: 'range'
          area: string
          minPoints: number
          maxPoints: number
        }[]
      }
    ): void
  }>()

  const min = ref(props.min ?? 1)
  const max = ref(props.max ?? 5)
  const selectedArea = ref('')
  const areaConfigs = ref<Record<string, { minPoints: number; maxPoints: number }>>({})

  const minPoints = computed({
    get: () => areaConfigs.value[selectedArea.value]?.minPoints ?? 0,
    set: (val) => {
      if (selectedArea.value) {
        areaConfigs.value[selectedArea.value] = {
          ...(areaConfigs.value[selectedArea.value] ?? { maxPoints: 0 }),
          minPoints: val,
        }
      }
    },
  })

  const maxPoints = computed({
    get: () => areaConfigs.value[selectedArea.value]?.maxPoints ?? 0,
    set: (val) => {
      if (selectedArea.value) {
        areaConfigs.value[selectedArea.value] = {
          ...(areaConfigs.value[selectedArea.value] ?? { minPoints: 0 }),
          maxPoints: val,
        }
      }
    },
  })

  watch(
    [min, max, areaConfigs],
    () => {
      const sliderLogics = Object.entries(areaConfigs.value)
        .filter(
          ([area, config]) =>
            area.trim() !== '' && (config.minPoints !== 0 || config.maxPoints !== 0)
        )
        .map(([area, config]) => ({
          type: 'range' as const,
          area,
          minPoints: config.minPoints,
          maxPoints: config.maxPoints,
        }))

      emit('update', {
        min: min.value,
        max: max.value,
        sliderLogics,
      })
    },
    { deep: true }
  )

  onMounted(() => {
    if (props.sliderLogics) {
      for (const logic of props.sliderLogics) {
        areaConfigs.value[logic.area] = {
          minPoints: logic.minPoints,
          maxPoints: logic.maxPoints,
        }
      }
    }
  })
</script>