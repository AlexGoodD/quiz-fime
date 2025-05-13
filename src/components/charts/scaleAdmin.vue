<template>
  <div class="line-container">
    <h3 class="tw-text-lg tw-font-medium tw-m-0">{{ props.title }}</h3>
    <div class="line-chart-wrapper">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, defineProps } from 'vue'
  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
  } from 'chart.js'

  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
  )

  interface ChartData {
    labels: string[]
    datasets: {
      data: number[]
      label: string
      backgroundColor?: string
      borderColor?: string
      tension?: number
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
        type: 'line',
        data: {
          labels: props.chartData.labels.slice().reverse(),
          datasets: props.chartData.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data.slice().reverse(),
            borderColor: '#3366FF',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hoverRadius: 5,
            },
          },
          scales: {
            x: {
              offset: false,
              grid: { display: false },
              ticks: {
                padding: 20,
                color: '#333',
                font: { family: 'Inter, sans-serif', size: 14 },
                callback: function (value: any) {
                  if (typeof value === 'string') {
                    return value.charAt(0).toUpperCase() + value.slice(1)
                  } else if (typeof value === 'number') {
                    const label = props.chartData.labels.slice().reverse()[value]
                    return label.charAt(0).toUpperCase() + label.slice(1)
                  }
                  return value
                },
              },
            },
            y: {
              display: false,
              grid: { display: false },
              ticks: { display: false },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              position: 'nearest',
              backgroundColor: '#fff',
              titleColor: '#000',
              bodyColor: '#000',
              borderColor: '#ccc',
              borderWidth: 1,
              titleFont: {
                size: 14,
                weight: 'bold',
              },
              bodyFont: {
                size: 13,
              },
              callbacks: {
                label: function (context) {
                  return ` ${context.raw} formularios enviados`
                },
                title: function (context) {
                  return `Día: ${context[0].label}`
                },
              },
            },
          },
          interaction: {
            mode: 'index',
            intersect: false,
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
  .line-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 32rem;
    height: 250px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 1rem;
    margin: 1rem;
  }

  .line-chart-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>