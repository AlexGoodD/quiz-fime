<template>
    <div>
        <h1>{{ props.title }}</h1>
        <div v-for="option in props.options" :key="option">
            <button @click="selectOption(option)">{{ option }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  title: string;
  options: string[];
}>();

const emits = defineEmits(['update:selectedOption']);

function selectOption(option: string) {
  emits('update:selectedOption', option);
}
</script>

<style scoped>
</style>