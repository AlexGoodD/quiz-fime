<template>
  <div>
    <h1>{{ props.question }}</h1>
    <div class="tw-flex tw-justify-center">
      <button
        @click="() => updateValue('Verdadero', emits)"
        :class="{ 'tw-transform tw-translate-y-1': modelValue === 'Verdadero' }"
        class="tw-text-black tw-py-8 tw-px-6 tw-w-[100%] tw-cursor-pointer tw-text-base tw-rounded-xl tw-m-1 tw-bg-transparent tw-transition tw-duration-500 tw-border tw-border-[#7DC87DFF] hover:-tw-translate-y-1"
      >
        Verdadero
      </button>
      <button
        @click="() => updateValue('Falso', emits)"
        :class="{ 'tw-transform tw-translate-y-1': modelValue === 'Falso' }"
        class="tw-text-black tw-py-8 tw-px-6 tw-w-[100%] tw-cursor-pointer tw-text-base tw-rounded-xl tw-m-1 tw-bg-transparent tw-transition tw-duration-500 hover:-tw-translate-y-1 tw-border tw-border-[#CA6868]"
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
