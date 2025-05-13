<template>
  <div class="item-container">
    <div class="tw-flex tw-items-center tw-gap-5 tw-mb-1 tw-text-left tw-absolute tw-top-5">
      <h3 class="tw-text-lg tw-font-medium tw-m-0">{{ props.title }}</h3>
    </div>
    <div class="chart-wrapper">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, defineProps } from 'vue'
  import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'

  Chart.register(PieController, ArcElement, Tooltip, Legend)

  interface ChartData {
    labels: string[]
    datasets: {
      data: number[]
      backgroundColor: string[]
    }[]
  }

  const props = defineProps<{
    title: string
    chartData: ChartData
  }>()
  const canvas = ref<HTMLCanvasElement | null>(null)
  let chart: Chart | null = null
  onMounted(() => {
    if (canvas.value) {
      chart = new Chart(canvas.value, {
        type: 'pie',
        data: props.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              display: false,
            },
            tooltip: {
              bodySpacing: 10,
              padding: 10,
              position: 'nearest',
              backgroundColor: '#fff',
              titleColor: '#000',
              bodyColor: '#000',
              borderColor: '#ccc',
              borderWidth: 1,
              callbacks: {
                label: function (context) {
                  const value = context.raw || 0
                  return ` ${value} respuestas`
                },
                title: function (context) {
                  const title = context[0].label || ''
                  return title.match(/.{1,20}/g)?.join('\n') || title
                },
              },
              titleFont: {
                size: 11,
                weight: 'bold',
              },
              bodyFont: {
                size: 10,
                weight: 'normal',
              },
              footerFont: {
                size: 10,
              },
            },
          },
        },
      })
    }
  })
  watch(
    () => props.chartData,
    (newData) => {
      if (chart) {
        chart.data = newData
        chart.update()
      }
    }
  )
</script>

<style scoped>
  .item-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 18rem;
    height: 18rem;
    border: 1px solid #ccc;
    border-radius: 1.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 10px;
    position: relative;
    overflow: visible;
  }

  .chart-wrapper {
    position: relative;
    width: 100%;
    height: 50%;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
    pointer-events: auto;
  }
</style>
