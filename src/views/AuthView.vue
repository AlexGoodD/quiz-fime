<template>
  <div>
    <div v-if="!isAuthenticated">
      <div class="centered-container">

    <div v-if="showLogin" class="login-register-form">
        <LoginPage @loginSuccess="handleLoginSuccess" @switchToRegister="showRegisterPage" />
      </div>
      <div v-else class="login-register-form">
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
import { auth } from '../firebase';

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

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-register-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}
</style>