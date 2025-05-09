<template>
  <div>
    <div v-if="!isAuthenticated">
      <div class="tw-flex tw-justify-center tw-items-center tw-h-[100vh]">

    <div v-if="showLogin" class="tw-w-[100%] tw-p-5 tw-bg-white tw-rounded-lg">
        <LoginPage @loginSuccess="handleLoginSuccess" @switchToRegister="showRegisterPage" />
      </div>
      <div v-else class="tw-w-[100%] tw-p-5 tw-bg-white tw-rounded-lg">
        <RegisterPage @registerSuccess="handleRegisterSuccess" @switchToLogin="showLoginPage" />
      </div>
    </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoginPage from '../components/pages/LoginPage.vue';
import RegisterPage from '../components/pages/RegisterPage.vue';
import { auth } from '@/firebase';

const isAuthenticated = ref(false);
const showLogin = ref(true);
const router = useRouter();

onMounted(() => {
  auth.onAuthStateChanged(user => {
    isAuthenticated.value = !!user;
    if (isAuthenticated.value) {
      router.push('/quiz');
    } else {
      router.push('/auth');
    }
  });
});

function handleLoginSuccess() {
  isAuthenticated.value = true;
  router.push('/quiz');
}

function handleRegisterSuccess() {
  isAuthenticated.value = true;
  router.push('/quiz');
}

function showLoginPage() {
  showLogin.value = true;
}

function showRegisterPage() {
  showLogin.value = false;
}
</script>
