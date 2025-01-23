<template>
  <div>
    <h2>Gráficas</h2>
    <div v-for="(question, index) in props.questions" :key="index">
      <h3>{{ question.question }}</h3>
      <PieChart :chart-data="getChartData(question)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import PieChart from './pieChart.vue';

interface Question {
  question: string;
  options: string[];
  responses: number[];
}

const props = defineProps<{ 
  questions: Question[]
}>();

function getChartData(question: Question) {
  return {
    labels: question.options,
    datasets: [
      {
        data: question.responses,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };
}
</script>