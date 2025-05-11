<template>
  <div class="tw-flex tw-text-left tw-flex-col tw-gap-3 tw-mt-0 tw-mx-[10rem] tw-border tw-border-[#ccc] tw-p-8 tw-rounded-2xl">
    <div class="tw-flex tw-mt-4 tw-justify-between tw-align-center tw-border-b tw-border-[#ccc]">
    <h2 class="tw-text-2xl tw-font-bold tw-mb-4">Pregunta 1</h2>
      <div class="tw-flex tw-gap-10 tw-align-center">
      <button ><font-awesome-icon icon="floppy-disk" class="tw-text-[#ccc] tw-transition-colors tw-duration-500 hover:tw-text-blue-950" /></button>
      <button ><font-awesome-icon icon="trash" class="tw-text-[#ccc] tw-transition-colors tw-duration-500 hover:tw-text-red-400" /></button>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-text-left tw-gap-2">
      <label class="tw-text-base tw-font-bold" for="questionText">Pregunta</label>
      <input class="tw-p-4 tw-text-base tw-border tw-border-[#ccc] tw-rounded-lg" id="questionText" type="text" placeholder="Escribe tu pregunta aquí" />
    </div>

    <div class="tw-flex tw-flex-col tw-text-left tw-gap-2">
      <label class="tw-text-base tw-font-bold" for="questionType">Tipo de pregunta</label>
      <select class="tw-p-4 tw-text-base tw-border tw-border-[#ccc] tw-rounded-lg tw-bg-white tw-appearance-none" id="questionType" v-model="questionType">
        <option value="slider">Selector</option>
        <option value="multipleChoice">Selección múltiple</option>
        <option value="trueFalse">Verdadero/Falso</option>
      </select>
    </div>

    <transition name="fade">
      <div v-if="showDetails">
        <div v-if="questionType === 'slider'" class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-font-bold">Rango de valores</label>
          <SliderSelect :areas="areaList" @update="sliderConfig = $event" />
        </div>

        <div v-else-if="questionType === 'multipleChoice'" class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-font-bold">Opciones</label>
          <MultipleChoiceOption
              v-for="(i) in options"
              :key="i"
              :areas="areaList"
              @update="updateOption(i, $event)"
          />
          <button @click="addOption" class="tw-text-blue-600 hover:tw-underline tw-w-fit tw-mt-2">
            + Añadir opción
          </button>
        </div>

        <div v-else-if="questionType === 'trueFalse'" class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-font-bold">Asignación de puntos</label>
          <TrueFalse :areas="areaList" @update="trueFalseConfig = $event" />
        </div>
      </div>
    </transition>

    <!-- Botón de expandir/colapsar -->
    <div class="tw-flex tw-justify-center tw-mt-4 -tw-mb-4">
      <button @click="showDetails = !showDetails" class="tw-text-gray-600 hover:tw-text-blue-800 tw-transition">
        <font-awesome-icon :icon="showDetails ? 'chevron-up' : 'chevron-down'" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MultipleChoiceOption from '@/components/questionsCreate/multipleChoice.vue'
import SliderSelect from '@/components/questionsCreate/sliderSelect.vue'
import TrueFalse from '@/components/questionsCreate/trueFalse.vue'

const questionType = ref<'slider' | 'multipleChoice' | 'trueFalse'>('slider')

const showDetails = ref(true)

const areaList = [
  'Nanotecnología',
  'Logística y Cadena de SuministrossssssssssLogística y Cadena de SuministrossssssssssLogística y Cadena de SuministrossssssssssLogística y Cadena de Suministrossssssssss',
  'Ingeniería Eléctrica',
  'Tecnologías de la Información',
]

const options = ref<Array<any>>([])

const sliderConfig = ref({})

const trueFalseConfig = ref({})

function addOption() {
  options.value.push({})
}

function updateOption(index: number, data: { option: string; area: string; points: number }) {
  options.value[index] = data
}
</script>

<style scoped>
#questionType {
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 2rem;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>