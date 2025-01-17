<template>
  <div>
    <div v-if="!isAuthenticated">
      <LoginPage @loginSuccess="handleLoginSuccess" />
      <RegisterPage @registerSuccess="handleRegisterSuccess" />
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';

const isAuthenticated = ref(false);
const router = useRouter();

function handleLoginSuccess() {
  isAuthenticated.value = true;
  router.push('/quiz');
}

function handleRegisterSuccess() {
  isAuthenticated.value = true;
  router.push('/quiz');
}
</script>

<style scoped>
</style>