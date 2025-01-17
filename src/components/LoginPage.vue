<template>
    <div>
        <h2>Login</h2>
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="handleLogin">Login</button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { login } from '../services/authService';

const email = ref('');
const password = ref('');
const emits = defineEmits(['loginSuccess']);

async function handleLogin() {
  try {
    await login(email.value, password.value);
    emits('loginSuccess');
  } catch (error) {
    console.error('Login failed:', error);
  }
}
</script>

<style scoped>
</style>