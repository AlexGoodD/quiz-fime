<template>
  <div>
      <h1>{{ question }}</h1>
      <input type="range" :min="min" :max="max" v-model="sliderValue" @input="updateValue" />
      <span>{{ sliderValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
const props = defineProps<{
  question: string;
  modelValue: number;
  min: number;
  max: number;
}>();
const emits = defineEmits(['update:modelValue']);
const sliderValue = ref(props.modelValue || props.min);
watch(
  () => props.modelValue,
  (newValue) => {
    sliderValue.value = newValue;
  }
);
function updateValue() {
  emits('update:modelValue', sliderValue.value);
}
</script>

<style scoped>
</style>