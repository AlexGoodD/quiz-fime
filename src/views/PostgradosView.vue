<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import PostgradosItem from '@/components/postgradosItem.vue'
  import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore'
  import { db } from '@/firebase'
  import { PostgradoType } from '@/types/PosgradoType'
  import { AreaType } from '@/types/AreasType'
  import SaveButton from '@/components/saveButton.vue'

  const postgrados = ref<PostgradoType[]>([])

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

        if (postgrado.id) {
          // Actualizar documento existente
          const postgradoRef = doc(db, 'postgrados', postgrado.id)
          await updateDoc(postgradoRef, {
            name: postgrado.name,
            type: postgrado.type,
            areaPoints: postgrado.areaPoints,
          })
        } else {
          // Crear nuevo documento
          const { id, ...data } = postgrado
          await addDoc(collection(db, 'postgrados'), data)
        }
      }
      alert('Postgrados guardados exitosamente.')
      fetchPostgrados() // Refrescar la lista después de guardar
    } catch (error) {
      console.error('Error al guardar los postgrados:', error)
    }
  }

  async function fetchPostgrados() {
    try {
      const querySnapshot = await getDocs(collection(db, 'postgrados'))
      postgrados.value = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<PostgradoType, 'id'>),
        id: doc.id,
      }))
    } catch (error) {
      console.error('Error al obtener los postgrados:', error)
    }
  }

  function deletePostgrado(index: number) {
    postgrados.value.splice(index, 1)
  }

  onMounted(() => {
    fetchPostgrados()
  })
</script>

<template>
  <div class="tw-flex tw-justify-center">
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-10">Postgrados</h1>
  </div>
  <h2 class="tw-mb-10">
    Aqui encontrarás todas los postgrados que se encuentran como resultados en tu cuestionario.
  </h2>
  <div v-for="(postgrado, index) in postgrados" :key="index">
    <PostgradosItem v-model="postgrados[index]" class="tw-mb-10" @delete="deletePostgrado(index)" />
  </div>
  <button @click="addPostgrado" class="tw-text-blue-500 hover:tw-underline tw-mt-2 tw-mb-10">
    Agregar postgrado
  </button>
  <SaveButton v-if="postgrados.length > 0" @click="savePostgrados" />
</template>

<style scoped></style>
