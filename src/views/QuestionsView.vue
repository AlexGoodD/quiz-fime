<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import questionItem from '@/components/adminComponents/questionItem.vue'
  import SaveButton from '@/components/saveButton.vue'
  import { fetchAreas } from '@/services/areaService'
  import { Question } from '@/types/QuestionsType'
  import { saveQuestions, fetchQuestions } from '@/services/questionsService'

  const preguntas = ref<Question[]>([])

  async function crearNuevaPregunta() {
    const siguientePosicion =
      preguntas.value.length > 0 ? Math.max(...preguntas.value.map((p) => p.position)) + 1 : 1

    const nuevaPregunta: Question = {
      type: 'slider',
      position: siguientePosicion,
      question: '',
      min: 1,
      max: 20,
      sliderLogics: [
        {
          type: 'range',
          area: '',
          minPoints: 0,
          maxPoints: 0,
        },
      ],
    }

    preguntas.value.push(nuevaPregunta)
  }

  function actualizarPregunta(index: number, nueva: Question) {
    preguntas.value[index] = nueva
  }

  function eliminarPregunta(index: number) {
    preguntas.value.splice(index, 1)

    preguntas.value.forEach((pregunta, i) => {
      pregunta.position = i + 1
    })
  }

  async function guardarCuestionario() {
    try {
      await saveQuestions(preguntas.value)
      alert('Preguntas guardadas exitosamente.')
      const actualizadas = await fetchQuestions()
      preguntas.value = actualizadas.sort((a, b) => a.position - b.position)
    } catch (error) {
      console.error('Error al guardar:', error)
      alert('Error al guardar las preguntas.')
    }
  }

  const areasDisponibles = ref<string[]>([])

  onMounted(async () => {
    try {
      const areas = await fetchAreas()
      areasDisponibles.value = areas.map((area) => area.name)

      const preguntasCargadas = await fetchQuestions()
      preguntas.value = preguntasCargadas.sort((a, b) => a.position - b.position)
    } catch (error) {
      console.error('Error al cargar datos:', error)
    }
  })
</script>

<template>
  <div class="tw-flex tw-justify-center">
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-10">Cuestionario</h1>
  </div>
  <h2 class="tw-mb-10">
    Aqui encontrarás todas las preguntas que se encuentran en tu cuestionario.
  </h2>
  <questionItem
    v-for="(pregunta, index) in preguntas"
    :key="index"
    :areas-disponibles="areasDisponibles"
    :model-value="pregunta"
    @update="(val) => actualizarPregunta(index, val)"
    @delete="() => eliminarPregunta(index)"
    class="tw-mb-10"
  />
  <button @click="crearNuevaPregunta" class="tw-text-blue-500 hover:tw-underline tw-mb-8">
    + Añadir pregunta
  </button>
  <SaveButton @save="guardarCuestionario" />
</template>

<style scoped></style>
