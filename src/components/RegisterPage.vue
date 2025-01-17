<template>
    <div>
        <h2>Register</h2>
        <input v-model="registerEmail" type="email" placeholder="Email" />
        <input v-model="registerPassword" type="password" placeholder="Password" />
        <button @click="handleRegister">Register</button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { register } from '../services/authService';

const registerEmail = ref('');
const registerPassword = ref('');
const emits = defineEmits(['registerSuccess']);

async function handleRegister() {
  try {
    await register(registerEmail.value, registerPassword.value);
    emits('registerSuccess');
  } catch (error) {
    console.error('Registration failed:', error);
  }
}
</script>

<style scoped>
</style>