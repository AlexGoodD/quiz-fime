<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { AreaType } from '@/types/AreasType'
  import { createArea } from '@/services/areaService'

  const props = defineProps({
    modelValue: { type: Object, required: true },
    areasDisponibles: { type: Array as () => AreaType[], required: true },
    refrescarAreas: { type: Function, required: true },
  })

  const emit = defineEmits(['update:modelValue', 'delete'])

  const nuevaAreaNombre = ref('')

  const areas = computed(() => props.areasDisponibles)

  async function crearNuevaArea() {
    const nombre = nuevaAreaNombre.value.trim()
    if (!nombre) return
    try {
      await createArea(nombre)
      nuevaAreaNombre.value = ''
      await props.refrescarAreas()
    } catch (e) {
      console.error('Error al crear área:', e)
    }
  }

  const name = ref(props.modelValue.name)
  const type = ref(props.modelValue.type)
  const areaPoints = ref(props.modelValue.areaPoints || {})
  const showDetails = ref(false)

  watch([name, type, areaPoints], () => {
    emit('update:modelValue', {
      id: props.modelValue.id,
      name: name.value,
      type: type.value,
      areaPoints: areaPoints.value,
    })
  })
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
      <label class="tw-text-base tw-font-bold" for="questionText">Nombre del posgrado</label>
      <input
        class="tw-p-4 tw-text-base tw-border tw-border-[#ccc] tw-rounded-lg"
        v-model="name"
        type="text"
        placeholder="Escribe tu pregunta aquí"
      />
    </div>

    <div class="tw-flex tw-flex-col tw-text-left tw-gap-2">
      <label class="tw-text-base tw-font-bold" for="questionType">Nivel de posgrado</label>
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
        <div v-if="showDetails" class="tw-grid tw-grid-cols-4 tw-gap-4">
          <div
            v-for="area in areas"
            :key="area.id"
            class="tw-border tw-p-4 tw-rounded tw-flex tw-flex-col"
          >
            <label
              class="tw-text-sm tw-font-semibold tw-mb-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"
              >{{ area.name }}</label
            >
            <input
              type="number"
              class="tw-p-2 tw-border tw-rounded"
              v-model.number="areaPoints[area.name]"
              placeholder="Puntos"
            />
          </div>

          <!-- Fila completa para nueva área (col-span-2) -->
          <div class="tw-col-span-2 tw-flex tw-items-center tw-gap-2 tw-mt-4">
            <input
              v-model="nuevaAreaNombre"
              placeholder="Nueva área"
              class="tw-w-1/2 tw-p-2 tw-border tw-rounded"
            />
            <button @click="crearNuevaArea" class="tw-text-blue-500 hover:tw-underline">
              + Crear área
            </button>
          </div>
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
