<template>
    <div>
        <Slider question="¿Cómo calificarías tu experiencia?" @update:sliderValue="handleSliderValue" />
        <TrueFalse question="¿Es verdadero o falso?" @update:answer="handleTrueFalseAnswer" />
        <MultOptions title="Selecciona una opción" :options="options" @update:selectedOption="handleSelectedOption" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Slider from '../components/SliderSelect.vue';
import TrueFalse from '../components/TrueFalse.vue';
import MultOptions from '../components/MultOptions.vue';

const sliderValue = ref(1);
const trueFalseAnswer = ref<boolean | null>(null);
const selectedOption = ref<string | null>(null);
const options = ref(['Opción 1', 'Opción 2', 'Opción 3']);

function handleSliderValue(value: number) {
  sliderValue.value = value;
}

function handleTrueFalseAnswer(answer: boolean) {
  trueFalseAnswer.value = answer;
}

function handleSelectedOption(option: string) {
  selectedOption.value = option;
}
</script>

<style scoped>
</style>