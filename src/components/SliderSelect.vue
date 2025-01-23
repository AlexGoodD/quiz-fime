<template>
  <div>
    <h1>{{ question }}</h1>
    <input type="range" :min="min" :max="max" v-model="sliderValue" @input="() => updateValue(emits)" />
    <span>{{ sliderValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useSliderQuestion } from '../services/questionService';

const props = defineProps<{
  question: string;
  modelValue: number;
  min: number;
  max: number;
}>();
const emits = defineEmits(['update:modelValue']);

const { sliderValue, updateValue } = useSliderQuestion(props);
</script>

<style scoped>
</style>