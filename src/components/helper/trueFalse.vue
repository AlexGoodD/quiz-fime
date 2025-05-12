<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-items-center tw-gap-4">
      <label class="tw-font-bold">Verdadero</label>
      <select
        v-model="trueArea"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[16rem] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-appearance-none"
      >
        <option disabled value="">Selecciona un área</option>
        <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
      </select>
      <input
        v-model.number="truePoints"
        type="number"
        min="0"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[6rem]"
        placeholder="Puntos"
      />
    </div>
    <div class="tw-flex tw-items-center tw-gap-4">
      <label class="tw-font-bold">Falso</label>
      <select
        v-model="falseArea"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[16rem] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-appearance-none"
      >
        <option disabled value="">Selecciona un área</option>
        <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
      </select>
      <input
        v-model.number="falsePoints"
        type="number"
        min="0"
        class="tw-p-2 tw-border tw-border-[#ccc] tw-rounded-lg tw-w-[6rem]"
        placeholder="Puntos"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted, defineProps, defineEmits } from 'vue'

  const props = defineProps<{
    areas: string[]
    modelValue?: {
      Verdadero: { [area: string]: number }
      Falso: { [area: string]: number }
    }
  }>()

  const emit = defineEmits<{
    (
      e: 'update',
      value: { Verdadero: { [area: string]: number }; Falso: { [area: string]: number } }
    ): void
  }>()

  const trueArea = ref('')
  const falseArea = ref('')
  const truePointsMap = ref<Record<string, number>>({})
  const falsePointsMap = ref<Record<string, number>>({})

  const truePoints = computed({
    get: () => truePointsMap.value[trueArea.value] ?? 0,
    set: (val) => {
      if (trueArea.value) {
        truePointsMap.value[trueArea.value] = val
      }
    },
  })

  const falsePoints = computed({
    get: () => falsePointsMap.value[falseArea.value] ?? 0,
    set: (val) => {
      if (falseArea.value) {
        falsePointsMap.value[falseArea.value] = val
      }
    },
  })

  watch(
    [trueArea, falseArea, truePointsMap, falsePointsMap],
    () => {
      emit('update', {
        Verdadero: { ...truePointsMap.value },
        Falso: { ...falsePointsMap.value },
      })
    },
    { deep: true }
  )

  onMounted(() => {
    if (props.modelValue) {
      const { Verdadero, Falso } = props.modelValue
      truePointsMap.value = { ...Verdadero }
      falsePointsMap.value = { ...Falso }

      const [firstTrue] = Object.keys(Verdadero ?? {})
      const [firstFalse] = Object.keys(Falso ?? {})
      if (firstTrue) trueArea.value = firstTrue
      if (firstFalse) falseArea.value = firstFalse
    }
  })
</script>
