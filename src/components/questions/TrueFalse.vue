<script setup lang="ts">
  import { defineProps, ref, watch } from 'vue'
  import { updateAnswer } from '@/services/quizService'

  const props = defineProps<{
    question: string
    modelValue: string | null
    position: number // <- Agregado
  }>()

  const selected = ref(props.modelValue)

  watch(
    () => props.modelValue,
    (val) => {
      selected.value = val
    }
  )

  function updateValue(val: 'Verdadero' | 'Falso') {
    selected.value = selected.value === val ? null : val
    updateAnswer(selected.value, props.position)
  }
</script>

<template>
  <div>
    <h1 class="tw-mb-4 tw-text-large tw-font-medium">{{ question }}</h1>
    <div class="tw-flex tw-justify-center">
      <button
        @click="() => updateValue('Verdadero')"
        :class="{ 'tw-transform -tw-translate-y-2 tw-bg-green-200': selected === 'Verdadero' }"
        class="tw-flex tw-items-center tw-justify-center tw-text-black tw-font-medium tw-py-8 tw-px-6 tw-h-16 tw-w-[20rem] tw-cursor-pointer tw-text-base tw-rounded-xl tw-m-1 tw-bg-green-50 tw-border tw-border-green-700 tw-shadow-md tw-transition tw-duration-500 hover:-tw-translate-y-1"
      >
        Verdadero
      </button>
      <button
        @click="() => updateValue('Falso')"
        :class="{ 'tw-transform -tw-translate-y-2 tw-bg-red-200': selected === 'Falso' }"
        class="tw-flex tw-items-center tw-justify-center tw-text-black tw-font-medium tw-py-8 tw-px-6 tw-h-16 tw-w-[20rem] tw-cursor-pointer tw-text-base tw-rounded-xl tw-m-1 tw-bg-red-50 tw-border tw-border-red-700 tw-shadow-md tw-transition tw-duration-500 hover:-tw-translate-y-1"
      >
        Falso
      </button>
    </div>
  </div>
</template>