<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch, defineProps } from 'vue';
  import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
  
  Chart.register(PieController, ArcElement, Tooltip, Legend);
  
  interface ChartData {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  }
  
  const props = defineProps<{ chartData: ChartData }>();
  
  const canvas = ref<HTMLCanvasElement | null>(null);
  let chart: Chart | null = null;
  
  onMounted(() => {
    if (canvas.value) {
      chart = new Chart(canvas.value, {
        type: 'pie',
        data: props.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${value} respuestas`;
                },
              },
            },
          },
        },
      });
    }
  });
  
  watch(
    () => props.chartData,
    (newData) => {
      if (chart) {
        chart.data = newData;
        chart.update();
      }
    }
  );
  </script>
  
  <style scoped>
canvas {
  max-height: 300px;
  display: block;
  margin: 0 auto;
}
  </style>