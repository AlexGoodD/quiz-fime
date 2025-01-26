<template>
  <div id="app">
    <button id="menu-toggle" :class="{ open: isOpen }" @click="toggleMenu">
      <ChevronRightIcon class="open-icon" />
    </button>
    <div id="sidebar" :class="{ open: isOpen }" v-if="isAuthenticated">
      <div v-if="isAuthenticated">
        <router-link to="/" class="router-link" title="Inicio">
          <HomeIcon class="icon" :class="{ active: isActive('/') }" />
        </router-link>
        <router-link to="/quiz" title="Quiz">
          <BookOpenIcon class="icon" :class="{ active: isActive('/quiz') }" />
        </router-link>
        <router-link
          to="/result"
          :class="{ active: isActive('/result') }"
          title="Resultados"
        >
          <DocumentCheckIcon class="icon" :class="{ active: isActive('/result') }" />
        </router-link>
        <router-link v-if="isAdmin" to="/admin" title="Panel de control">
          <ChartPieIcon class="icon" :class="{ active: isActive('/admin') }" />
        </router-link>
        <router-link
          to="/"
          @click="handleLogout"
          class="logout-btn"
          title="Cerrar sesión"
        >
          <ArrowLeftEndOnRectangleIcon class="icon" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { logout, checkAdminStatus } from "../services/authService";
import { subscribeToUserAuth } from "../services/adminService";
import { auth } from "../firebase";
import {
  HomeIcon,
  BookOpenIcon,
  DocumentCheckIcon,
  ChartPieIcon,
  ArrowLeftEndOnRectangleIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";

const isOpen = ref(false);
const isAuthenticated = ref(false);
const isAdmin = ref(false);
const router = useRouter();
const route = useRoute();

const handleLogout = async () => {
  try {
    await logout();
    isOpen.value = false;
    isAuthenticated.value = false;
    isAdmin.value = false;
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const isActive = (path) => route.path === path;

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

onMounted(async () => {
  const unsubscribe = subscribeToUserAuth((isAdminValue) => {
    isAdmin.value = isAdminValue;
  });

  const authUnsubscribe = auth.onAuthStateChanged(async (user) => {
    isAuthenticated.value = !!user;
    if (user) {
      isOpen.value = true;
      isAdmin.value = await checkAdminStatus();
    } else {
      isOpen.value = false;
      isAdmin.value = false;
    }
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
    if (authUnsubscribe) authUnsubscribe();
  });
});
</script>

<style scoped>
@import "../assets/menu.css";
</style>
