<template>
  <div>
    <Slider question="¿Cómo calificarías tu experiencia?" @update:sliderValue="handleSliderValue" />
    <TrueFalse question="¿Es verdadero o falso?" @update:answer="handleTrueFalseAnswer" />
    <MultOptions title="Selecciona una opción" :options="options" @update:selectedOption="handleSelectedOption" />
    <button @click="submitAnswers">Submit Answers</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Slider from '../components/SliderSelect.vue';
import TrueFalse from '../components/TrueFalse.vue';
import MultOptions from '../components/MultOptions.vue';
import { submitAnswers as submitAnswersToFirestore } from '../services/submitService';

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

async function submitAnswers() {
const answers = {
  slider: {
    question: '¿Cómo calificarías tu experiencia?',
    answer: sliderValue.value,
  },
  trueFalse: {
    question: '¿Es verdadero o falso?',
    answer: trueFalseAnswer.value,
  },
  multipleChoice: {
    question: 'Selecciona una opción',
    answer: selectedOption.value,
  },
};

try {
  await submitAnswersToFirestore(answers);
  console.log('Answers submitted successfully');
} catch (error) {
  console.error('Error submitting answers:', error);
}
}
</script>

<style scoped>
</style>