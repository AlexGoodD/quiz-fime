<template>
    <div>
        <h1>{{ question }}</h1>
        <input type="range" min="1" max="5" v-model="sliderValue" @input="updateValue" />
        <span>{{ sliderValue }}</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps<{
  question: string;
}>();

const emits = defineEmits(['update:sliderValue']);

const sliderValue = ref(1);

function updateValue() {
  emits('update:sliderValue', sliderValue.value);
}
</script>

<style scoped>
</style>