<template>
  <div>
    <AdminResults v-if="isAdmin" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { subscribeToUserAuth } from "@/services/adminService";
import AdminResults from "../components/pages/adminPage.vue";

const isAdmin = ref(localStorage.getItem("isAdmin") === "true");

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

<style scoped></style>
