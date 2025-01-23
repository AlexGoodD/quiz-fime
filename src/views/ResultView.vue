<template>
  <AppHeader />
  <div>
    <AdminResults v-if="isAdmin" />
    <ResultsQuiz v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { subscribeToUserAuth } from '../services/adminService';
import ResultsQuiz from '../components/ResultsQuiz.vue';
import AppHeader from '../components/AppHeader.vue';
import AdminResults from '../components/adminPage.vue';

const isAdmin = ref(localStorage.getItem('isAdmin') === 'true');

onMounted(() => {
  const unsubscribe = subscribeToUserAuth((isAdminValue) => {
    isAdmin.value = isAdminValue;
  });

  if (unsubscribe) {
    onUnmounted(() => {
      unsubscribe();
    });
  }
});
</script>

<style scoped>
</style>