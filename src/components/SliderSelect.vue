<template>
  <div>
    <h1>{{ question }}</h1>
    <input
      type="range"
      :min="min"
      :max="max"
      v-model="sliderValue"
      @input="updateValue"
    />
    <span>{{ sliderValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useSliderQuestion } from "../services/questionService";

const props = defineProps<{
  question: string;
  modelValue: number;
  min: number;
  max: number;
}>();
const emits = defineEmits<{
  (event: "update:modelValue", value: number): void;
}>();

const { sliderValue, updateValue } = useSliderQuestion(props, emits);
</script>
