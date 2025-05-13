<template>
  <div class="tw-overflow-hidden">
    <AdminPage v-if="isAdmin" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { subscribeToUserAuth } from '@/services/adminService'
  import AdminPage from '@/components/pages/adminPage.vue'

  const isAdmin = ref(localStorage.getItem('isAdmin') === 'true')

  onMounted(() => {
    document.body.style.overflow = 'hidden'
    const unsubscribe = subscribeToUserAuth((isAdminValue) => {
      isAdmin.value = isAdminValue
    })

    if (unsubscribe) {
      onUnmounted(() => {
        document.body.style.overflow = ''
        unsubscribe()
      })
    }
  })
</script>

<style scoped></style>
