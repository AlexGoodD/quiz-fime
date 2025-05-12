<template>
  <div
    class="tw-flex tw-text-left tw-flex-col tw-gap-3 tw-mt-0 tw-mx-[10rem] tw-border tw-border-[#ccc] tw-p-8 tw-rounded-2xl"
  >
    <div class="tw-flex tw-mt-4 tw-justify-between tw-align-center tw-border-b tw-border-[#ccc]">
      <h2 class="tw-text-2xl tw-font-bold tw-mb-4">Pregunta {{ questionData.position }}</h2>
      <div class="tw-flex tw-gap-10 tw-align-center">
        <button @click="emit('delete')">
          <font-awesome-icon
            icon="trash"
            class="tw-text-[#ccc] tw-transition-colors tw-duration-500 hover:tw-text-red-400"
          />
        </button>
      </div>
    </div>

    <div class="tw-flex tw-flex-col tw-text-left tw-gap-2">
      <label class="tw-text-base tw-font-bold" for="questionText">Pregunta</label>
      <input
        class="tw-p-4 tw-text-base tw-border tw-border-[#ccc] tw-rounded-lg"
        id="questionText"
        type="text"
        placeholder="Escribe tu pregunta aquí"
        v-model="questionData.question"
      />
    </div>

    <div class="tw-flex tw-flex-col tw-text-left tw-gap-2">
      <label class="tw-text-base tw-font-bold" for="questionType">Tipo de pregunta</label>
      <select
        class="tw-p-4 tw-text-base tw-border tw-border-[#ccc] tw-rounded-lg tw-bg-white tw-appearance-none"
        id="questionType"
        v-model="questionType"
      >
        <option value="slider">Selector</option>
        <option value="multipleChoice">Selección múltiple</option>
        <option value="trueFalse">Verdadero/Falso</option>
      </select>
    </div>

    <transition name="fade">
      <div v-if="showDetails">
        <div v-if="questionType === 'slider'" class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-font-bold">Rango de valores</label>
          <SliderSelect
            v-if="isSlider && sliderData"
            :areas="areasDisponibles"
            :min="sliderData.min"
            :max="sliderData.max"
            :sliderLogics="sliderData.sliderLogics"
            @update="updateSliderConfig"
          />
        </div>

        <div v-else-if="questionType === 'multipleChoice'" class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-font-bold">Opciones</label>
          <MultipleChoiceOption
            v-for="(opt, i) in multipleOptions"
            :key="i"
            :areas="areasDisponibles"
            :model-value="opt"
            @update="updateOption(i, $event)"
            @delete="removeOption(i)"
          />
          <button @click="addOption" class="tw-text-blue-600 hover:tw-underline tw-w-fit tw-mt-2">
            + Añadir opción
          </button>
        </div>

        <div v-else-if="questionType === 'trueFalse'" class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-font-bold">Asignación de puntos</label>
          <TrueFalse :areas="areasDisponibles" @update="trueFalseConfig = $event" />
        </div>
      </div>
    </transition>

    <div class="tw-flex tw-justify-center tw-mt-4 -tw-mb-4">
      <button
        @click="showDetails = !showDetails"
        class="tw-text-gray-600 hover:tw-text-blue-800 tw-transition"
      >
        <font-awesome-icon :icon="showDetails ? 'chevron-up' : 'chevron-down'" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed, onMounted } from 'vue'
  import MultipleChoiceOption from '@/components/questionsCreate/multipleChoice.vue'
  import SliderSelect from '@/components/questionsCreate/sliderSelect.vue'
  import TrueFalse from '@/components/questionsCreate/trueFalse.vue'
  import { MultipleChoiceQuestion, Question } from '@/types/QuestionsType'

  // Props recibidas del padre
  const props = defineProps<{
    modelValue: Question
    areasDisponibles: string[]
  }>()

  // Emisión para actualizar la pregunta en el componente padre
  const emit = defineEmits<{
    (e: 'update', value: Question): void
    (e: 'delete'): void
  }>()

  // Se crea una copia reactiva local de modelValue
  const questionData = ref<Question>({ ...props.modelValue })
  // Variable para controlar el tipo de pregunta (slider, multipleChoice, trueFalse)
  const questionType = ref<Question['type']>(props.modelValue.type)

  // Otras variables locales
  const showDetails = ref(false)

  const multipleOptions = ref<Array<{ option: string; areaPoints: Record<string, number> }>>([])
  const trueFalseConfig = ref({})

  // Computed para detectar si es una pregunta slider y para estrechar su tipado
  const isSlider = computed(() => questionData.value.type === 'slider')
  const sliderData = computed(() =>
    isSlider.value ? (questionData.value as Extract<Question, { type: 'slider' }>) : null
  )

  // Sincroniza los cambios que se produzcan en la prop modelValue con la copia local,
  // pero solo si existe alguna diferencia (para evitar actualizaciones innecesarias)
  watch(
    () => props.modelValue,
    (nuevo) => {
      if (JSON.stringify(nuevo) !== JSON.stringify(questionData.value)) {
        questionData.value = { ...nuevo }
        questionType.value = nuevo.type

        // 👇 Llama a la inicialización si es multipleChoice
        if (nuevo.type === 'multipleChoice') {
          initializeMultipleChoice()
        }
      }
    },
    { deep: true }
  )

  function initializeMultipleChoice() {
    const mcq = questionData.value as MultipleChoiceQuestion

    if (!mcq.options) mcq.options = []
    if (!mcq.values) mcq.values = {}

    multipleOptions.value = mcq.options.map((option) => ({
      option,
      areaPoints: mcq.values[option] ?? {},
    }))
  }

  // Cuando se modifique el select de tipo, actualiza el campo en questionData
  watch(questionType, (nuevoTipo) => {
    questionData.value.type = nuevoTipo

    if (nuevoTipo === 'multipleChoice') {
      initializeMultipleChoice()
    }
  })

  // Emite cambios al componente padre de forma diferida (debounce) para evitar loops infinitos
  let updateTimeout: ReturnType<typeof setTimeout> | null = null
  watch(
    questionData,
    () => {
      if (updateTimeout) clearTimeout(updateTimeout)
      updateTimeout = setTimeout(() => {
        emit('update', { ...questionData.value })
      }, 100)
    },
    { deep: true }
  )

  // Función para actualizar la configuración del slider
  function updateSliderConfig(data: {
    min: number
    max: number
    sliderLogics: {
      type: 'range'
      area: string
      minPoints: number
      maxPoints: number
    }[]
  }) {
    if (questionData.value.type === 'slider') {
      questionData.value.min = data.min
      questionData.value.max = data.max
      questionData.value.sliderLogics = data.sliderLogics
    }
  }

  function addOption() {
    multipleOptions.value.push({ option: '', areaPoints: {} })
    syncMultipleChoice()
  }

  function updateOption(
    index: number,
    data: { option: string; areaPoints: Record<string, number> }
  ) {
    multipleOptions.value[index] = data
    syncMultipleChoice()
  }

  function removeOption(index: number) {
    multipleOptions.value.splice(index, 1)
    syncMultipleChoice()
  }

  function syncMultipleChoice() {
    const options: string[] = []
    const values: MultipleChoiceQuestion['values'] = {}

    for (const opt of multipleOptions.value) {
      if (opt.option) {
        options.push(opt.option)
        values[opt.option] = opt.areaPoints
      }
    }

    const mcq = questionData.value as MultipleChoiceQuestion
    mcq.options = options
    mcq.values = values
  }

  onMounted(() => {
    if (questionType.value === 'multipleChoice') {
      initializeMultipleChoice()
    }
  })
</script>

<style scoped>
  #questionType {
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 2rem;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
</style>