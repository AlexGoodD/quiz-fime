<script setup lang="ts">
  import { computed, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['update:modelValue', 'delete'])

  const name = ref(props.modelValue.name)
  const type = ref(props.modelValue.type)
  const areaPoints = ref(props.modelValue.areaPoints || {})
  const showDetails = ref(false)

  const areas = computed({
    get() {
      return Object.entries(areaPoints.value).map(([name, points]) => ({
        name,
        points: Number(points),
      }))
    },
    set(newAreas: { name: string; points: number }[]) {
      const updatedPoints: Record<string, number> = {}
      newAreas.forEach(({ name, points }) => {
        if (name.trim()) {
          updatedPoints[name] = Number(points)
        }
      })
      areaPoints.value = updatedPoints
    },
  })

  watch([name, type, areaPoints], () => {
    emit('update:modelValue', {
      id: props.modelValue.id,
      name: name.value,
      type: type.value,
      areaPoints: areaPoints.value,
    })
  })

  function addArea() {
    const updatedPoints = { ...areaPoints.value }
    const newKey = ``
    updatedPoints[newKey] = 0
    areaPoints.value = updatedPoints
  }

  function removeArea(index: number) {
    const newAreas = [...areas.value]
    newAreas.splice(index, 1)
    areas.value = newAreas
  }
</script>

<template>
  <div
    class="tw-flex tw-text-left tw-flex-col tw-gap-3 tw-mt-0 tw-mx-[10rem] tw-border tw-border-[#ccc] tw-p-8 tw-rounded-2xl"
  >
    <div class="tw-flex tw-mt-4 tw-justify-between tw-align-center tw-border-b tw-border-[#ccc]">
      <h2 class="tw-text-2xl tw-font-bold tw-mb-4">Nombre del postgrado + Tipo de postgrado</h2>
      <div class="tw-flex tw-gap-10 tw-align-center">
        <button>
          <font-awesome-icon
            @click="$emit('delete')"
            icon="trash"
            class="tw-text-[#ccc] tw-transition-colors tw-duration-500 hover:tw-text-red-400"
          />
        </button>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-text-left tw-gap-2">
      <label class="tw-text-base tw-font-bold" for="questionText">Nombre del postgrado</label>
      <input
        class="tw-p-4 tw-text-base tw-border tw-border-[#ccc] tw-rounded-lg"
        v-model="name"
        type="text"
        placeholder="Escribe tu pregunta aquí"
      />
    </div>

    <div class="tw-flex tw-flex-col tw-text-left tw-gap-2">
      <label class="tw-text-base tw-font-bold" for="questionType">Nivel de postgrado</label>
      <select
        class="tw-p-4 tw-text-base tw-border tw-border-[#ccc] tw-rounded-lg tw-bg-white tw-appearance-none"
        v-model="type"
      >
        <option value="Maestria">Maestría</option>
        <option value="Doctorado">Doctorado</option>
        <option value="Especialidad">Especialidad</option>
      </select>
    </div>

    <div class="tw-flex tw-flex-col tw-text-left tw-gap-2">
      <label class="tw-text-base tw-font-bold" for="questionType">Puntos por área</label>
      <transition name="fade">
        <div v-if="showDetails" class="tw-flex tw-flex-col">
          <div v-for="(area, index) in areas" :key="index" class="tw-flex tw-gap-2 tw-items-center">
            <input
              v-model="area.name"
              type="text"
              placeholder="Área"
              class="tw-w-1/2 tw-p-2 tw-border tw-rounded"
            />
            <input
              v-model.number="area.points"
              type="number"
              placeholder="Puntos"
              class="tw-w-1/4 tw-p-2 tw-border tw-rounded"
            />
            <button @click="removeArea(index)" class="tw-text-red-500">Eliminar</button>
          </div>
          <button @click="addArea" class="tw-text-blue-500 hover:tw-underline tw-mt-2">
            + Añadir Área
          </button>
        </div>
      </transition>
    </div>

    <!-- Botón de expandir/colapsar -->
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
