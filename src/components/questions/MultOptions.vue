<script setup lang="ts">
import { useMultipleChoiceQuestion } from "@/services/questionService";

const props = defineProps<{
  question: string;
  options: string[];
  modelValue: string | null;
}>();
const emits = defineEmits(["update:modelValue"]);

const { selectedOption, updateOption } = useMultipleChoiceQuestion(props);
</script>


<template>
  <div class="tw-w-[50rem]">
    <h1 class="tw-mb-4 tw-text-large tw-font-medium">{{ question }}</h1>
    <div class="tw-flex tw-flex-col tw-flex-wrap tw-gap-3">
      <div
        v-for="option in options"
        :key="option"
        :class="['option', { selected: option === selectedOption }]"
        @click="() => updateOption(option, emits)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.option {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s ease;
  background-color: white;
}

.option:hover {
  transform: translateY(-5px);
}

.option.selected {
  transform: scale(0.95);
  border: 1px solid #737373;
}
</style>
