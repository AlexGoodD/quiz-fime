<template>
  <div>
      <h1>{{ question }}</h1>
      <input type="range" min="1" max="5" v-model="sliderValue" @input="updateValue" />
      <span>{{ sliderValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
const props = defineProps<{
question: string;
modelValue: number; 
}>();
const emits = defineEmits(['update:modelValue']);
const sliderValue = ref(props.modelValue || 1);
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