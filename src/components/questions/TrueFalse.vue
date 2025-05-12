<template>
  <div>
    <h1 class="tw-mb-4 tw-text-large tw-font-medium">{{ props.question }}</h1>
    <div class="tw-flex tw-justify-center">
      <button
        @click="() => updateValue('Verdadero', emits)"
        :class="{ 'tw-transform -tw-translate-y-2': modelValue === 'Verdadero' }"
        class=" tw-flex tw-items-center tw-justify-center tw-text-black tw-font-medium tw-py-8 tw-px-6 tw-h-16 tw-w-[100%] tw-cursor-pointer tw-text-base tw-rounded-xl tw-m-1 tw-bg-transparent tw-transition tw-duration-500 hover:-tw-translate-y-1 tw-bg-green-100 tw-border tw-border-green-700 tw-shadow-md"
      >
        Verdadero
      </button>
      <button
        @click="() => updateValue('Falso', emits)"
        :class="{ 'tw-transform -tw-translate-y-2 ': modelValue === 'Falso' }"
        class="tw-flex tw-items-center tw-justify-center tw-text-black tw-font-medium tw-py-8 tw-px-6 tw-h-16 tw-w-[100%] tw-cursor-pointer tw-text-base tw-rounded-xl tw-m-1 tw-bg-transparent tw-transition tw-duration-500 hover:-tw-translate-y-1 tw-bg-red-100 tw-border tw-border-red-700 tw-shadow-md"
      >
        Falso
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTrueFalseQuestion } from "@/services/questionService";

const props = defineProps<{
  question: string;
  modelValue: string | null;
}>();
const emits = defineEmits(["update:modelValue"]);

const { updateValue } = useTrueFalseQuestion(props);
</script>
