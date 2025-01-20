<template>
    <div>
        <h1>{{ props.question }}</h1>
        <button 
            @click="updateValue('true')" 
            :class="{ active: modelValue === 'true' }" 
            class="true"
        >
            True
        </button>
        <button 
            @click="updateValue('false')" 
            :class="{ active: modelValue === 'false' }" 
            class="false"
        >
            False
        </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  // Props y eventos
  const props = defineProps<{
  question: string;
  modelValue: string | null; 
  }>();
  
  const emits = defineEmits(['update:modelValue']);
  
  // Función para actualizar el valor y emitirlo al padre
  function updateValue(value: string) {
  emits('update:modelValue', value);
  }
  </script>
  
  <style scoped>
  .true {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin: 5px;
  }
  
  .false {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin: 5px;
  }
  
  .active {
  border: 2px solid black;
  }
  </style>