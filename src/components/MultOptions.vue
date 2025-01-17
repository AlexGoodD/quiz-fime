<template>
  <div>
      <h1>{{ props.title }}</h1>
      <select v-model="selectedOption" @change="updateOption">
          <option v-for="option in props.options" :key="option" :value="option">{{ option }}</option>
      </select>
      <div v-if="selectedOption">
          <p>Opción seleccionada: {{ selectedOption }}</p>
      </div>
  </div>
</template>

<script setup lang="ts"> 
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps<{
title: string;
options: string[];
}>();

const emits = defineEmits(['update:selectedOption']);
const selectedOption = ref<string | null>(null);

function updateOption() {
emits('update:selectedOption', selectedOption.value);
}
</script>

<style scoped>
/* Add your styles aquí */
select {
padding: 8px;
margin: 10px 0;
border: 1px solid #ccc;
border-radius: 4px;
font-size: 16px;
}
</style>