<template>
  <div id="app">
    <button class="tw-hidden tw-fixed tw-top-[100px] tw-left-0 tw-bg-[#111] tw-text-white tw-border-none tw-py-3 tw-px-0 tw-cursor-pointer tw-z-50 tw-w-8" id="menu-toggle" :class="{ open: isOpen }" @click="toggleMenu">
      <ChevronRightIcon class="tw-w-4" />
    </button>
    <div class="tw-h-[100%] tw-w-0 tw-fixed tw-z-1 tw-top-0 tw-left-0 tw-bg-[#111] tw-overflow-x-hidden tw-transition tw-duration-500 tw-pt-8 tw-text-left" id="sidebar" :class="{ open: isOpen }" v-if="isAuthenticated">
      <div v-if="isAuthenticated">
        <router-link to="/" class="router-link" title="Inicio">
          <HomeIcon class="tw-w-6 tw-h-6 tw-flex-shrink-0 tw-mr-3 tw-transition tw-transform tw-duration-500 hover:tw-text-white hover:tw-transform hover:tw-translate-x-1" :class="{ 'tw-text-white tw-translate-x-[5px]': isActive('/') }" />
        </router-link>
        <router-link to="/quiz" title="Quiz">
          <BookOpenIcon class="tw-w-6 tw-h-6 tw-flex-shrink-0 tw-mr-3 tw-transition tw-transform tw-duration-500 hover:tw-text-white hover:tw-transform hover:tw-translate-x-1" :class="{ 'tw-text-white tw-translate-x-[5px]': isActive('/quiz') }" />
        </router-link>
        <router-link
          to="/result"
          :class="{ active: isActive('/result') }"
          title="Resultados"
        >
          <DocumentCheckIcon class="tw-w-6 tw-h-6 tw-flex-shrink-0 tw-mr-3 tw-transition tw-transform tw-duration-500 hover:tw-text-white hover:tw-transform hover:tw-translate-x-1" :class="{ 'tw-text-white tw-translate-x-[5px]': isActive('/result') }" />
        </router-link>
        <router-link v-if="isAdmin" to="/admin" title="Panel de control">
          <ChartPieIcon class="tw-w-6 tw-h-6 tw-flex-shrink-0 tw-mr-3 tw-transition tw-transform tw-duration-500 hover:tw-text-white hover:tw-transform hover:tw-translate-x-1" :class="{ 'tw-text-white tw-translate-x-[5px]': isActive('/admin') }" />
        </router-link>
        <router-link
          to="/"
          @click="handleLogout"
          title="Cerrar sesión"
        >
          <ArrowLeftEndOnRectangleIcon class="tw-w-6 tw-h-6 tw-flex-shrink-0 tw-mr-3 tw-transition tw-transform tw-duration-500 hover:tw-text-white hover:tw-transform hover:tw-translate-x-1" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { logout, checkAdminStatus } from "@/services/authService";
import { subscribeToUserAuth } from "@/services/adminService";
import { auth } from "@/firebase";
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

<style >
#sidebar a {
  padding: 8px;
  text-decoration: none;
  color: #818181;
  display: block;
  left: 0;
  transition: transform 0.3s, opacity 0.3s;
  white-space: nowrap;
}

#sidebar a:hover {
  color: white;
}

#sidebar.open {
  width: 45px;
}
@media (max-width: 780px) {
  #sidebar {
    width: 0;
    transition: width 0.3s;
  }

  #sidebar.open {
    width: 45px;
  }

  #menu-toggle {
    display: block;
    transition: left 0.3s;
  }

  #menu-toggle.open {
    left: 44px;
    width: 30px;
  }
}
</style>
