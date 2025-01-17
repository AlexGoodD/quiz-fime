<template>
    <div>
        <h1>{{ question }}</h1>
        <button @click="selectTrue">True</button>
        <button @click="selectFalse">False</button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  question: string;
}>();

const emits = defineEmits(['update:answer']);

function selectTrue() {
  emits('update:answer', true);
  alert('True');
}

function selectFalse() {
  emits('update:answer', false);
  alert('False');
}
</script>

<style scoped>
</style>