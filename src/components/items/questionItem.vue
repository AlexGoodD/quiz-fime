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
          <TrueFalse
            v-if="isTrueFalse"
            :areas="areasDisponibles"
            :model-value="trueFalseValues"
            @update="updateTrueFalse"
          />
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
  import { ref, watch, onMounted, Ref } from 'vue'
  import MultipleChoiceOption from '@/components/helper/multipleChoice.vue'
  import SliderSelect from '@/components/helper/sliderSelect.vue'
  import TrueFalse from '@/components/helper/trueFalse.vue'
  import { Question, MultipleChoiceQuestion } from '@/types/QuestionsType'

  // lógica modular
  import { useSliderLogic } from '@/utils/useSliderLogic'
  import { useMultipleChoiceLogic } from '@/utils/useMultipleChoiceLogic'
  import { useTrueFalseLogic } from '@/utils/useTrueFalseLogic'

  // Props
  const props = defineProps<{
    modelValue: Question
    areasDisponibles: string[]
  }>()

  const emit = defineEmits<{
    (e: 'update', value: Question): void
    (e: 'delete'): void
  }>()

  const questionData = ref<Question>({ ...props.modelValue })
  const questionType = ref<Question['type']>(props.modelValue.type)
  const showDetails = ref(false)

  // --- Composables ---
  const { sliderData, updateSliderConfig, isSlider } = useSliderLogic(questionData)
  const {
    multipleOptions,
    initialize: initMultipleChoice,
    addOption,
    updateOption,
    removeOption,
  } = useMultipleChoiceLogic(questionData as Ref<MultipleChoiceQuestion>)

  const { isTrueFalse, trueFalseValues, updateTrueFalse } = useTrueFalseLogic(questionData)

  // --- Sync props.modelValue -> local ---
  watch(
    () => props.modelValue,
    (nuevo) => {
      if (JSON.stringify(nuevo) !== JSON.stringify(questionData.value)) {
        questionData.value = { ...nuevo }
        questionType.value = nuevo.type

        if (nuevo.type === 'multipleChoice') initMultipleChoice()
      }
    },
    { deep: true }
  )

  // --- Cambiar tipo de pregunta manualmente ---
  watch(questionType, (tipo) => {
    questionData.value.type = tipo

    if (tipo === 'multipleChoice') initMultipleChoice()
  })

  // --- Emit update (debounce) ---
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

  onMounted(() => {
    if (questionType.value === 'multipleChoice') initMultipleChoice()
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