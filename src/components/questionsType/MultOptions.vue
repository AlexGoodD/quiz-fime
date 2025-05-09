<template>
  <div>
    <h1>{{ question }}</h1>
    <div class="options-container">
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

<script setup lang="ts">
import { useMultipleChoiceQuestion } from "../../services/questionService";

const props = defineProps<{
  question: string;
  options: string[];
  modelValue: string | null;
}>();
const emits = defineEmits(["update:modelValue"]);

const { selectedOption, updateOption } = useMultipleChoiceQuestion(props);
</script>

<style scoped>
.options-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
}

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
