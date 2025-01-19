<template>
  <div>
    <h1>{{ question }}</h1>
    <select v-model="selectedOption" @change="updateOption">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <div v-if="selectedOption">
      <p>Opción seleccionada: {{ selectedOption }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

// Props y eventos
const props = defineProps<{
  question: string;
  options: string[];
  modelValue: string | null;
}>();

const emits = defineEmits(['update:modelValue']);

// Valor local sincronizado con el valor del padre
const selectedOption = ref<string | null>(props.modelValue);

// Sincronizar el valor local si el padre lo actualiza
watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue;
  }
);

// Emitir el cambio al padre
function updateOption() {
  emits('update:modelValue', selectedOption.value);
}
</script>

<style scoped>
select {
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>