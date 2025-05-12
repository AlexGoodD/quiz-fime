<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import PostgradosItem from '@/components/postgradosItem.vue'
  import SaveButton from '@/components/saveButton.vue'
  import { PostgradoType } from '@/types/PosgradoType'
  import { AreaType } from '@/types/AreasType'
  import { fetchAreas } from '@/services/areaService'
  import { fetchPostgrados, savePostgrado } from '@/services/posgradoService'

  const postgrados = ref<PostgradoType[]>([])
  const areasDisponibles = ref<AreaType[]>([])

  function addPostgrado() {
    postgrados.value.push({
      name: '',
      type: 'Maestria',
      areaPoints: {},
    })
  }

  async function savePostgrados() {
    try {
      for (const postgrado of postgrados.value) {
        if (!postgrado.name || !postgrado.type) {
          alert('Completa todos los campos antes de guardar.')
          return
        }
        await savePostgrado(postgrado)
      }
      alert('Postgrados guardados exitosamente.')
      await loadPostgrados()
    } catch (error) {
      console.error('Error al guardar los postgrados:', error)
    }
  }

  async function loadPostgrados() {
    try {
      postgrados.value = await fetchPostgrados()
    } catch (error) {
      console.error('Error al obtener los postgrados:', error)
    }
  }

  async function loadAreas() {
    try {
      areasDisponibles.value = await fetchAreas()
    } catch (error) {
      console.error('Error al obtener las áreas:', error)
    }
  }

  function deletePostgrado(index: number) {
    postgrados.value.splice(index, 1)
  }

  onMounted(() => {
    loadPostgrados()
    loadAreas()
  })
</script>

<template>
  <div class="tw-flex tw-justify-center">
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-10">Posgrados</h1>
  </div>
  <h2 class="tw-mb-10">
    Aqui encontrarás todas los posgrados que se encuentran como resultados en tu cuestionario.
  </h2>
  <div v-for="(postgrado, index) in postgrados" :key="index">
    <PostgradosItem
      v-model="postgrados[index]"
      :areas-disponibles="areasDisponibles"
      :refrescar-areas="fetchAreas"
      class="tw-mb-10"
      @delete="deletePostgrado(index)"
    />
  </div>
  <button @click="addPostgrado" class="tw-text-blue-500 hover:tw-underline tw-mt-2 tw-mb-10">
    Agregar postgrado
  </button>
  <SaveButton v-if="postgrados.length > 0" @click="savePostgrados" />
</template>

<style scoped></style>
