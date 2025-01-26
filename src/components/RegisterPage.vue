<template>
  <div class="container">
    <h2>Registro</h2>
    <div class="input-group">
      <label for="registerEmail">Email</label>
      <div class="input-with-icon">
        <i class="fas fa-envelope"></i>
        <input
          v-model="registerEmail"
          type="email"
          id="registerEmail"
          placeholder="Ingresa tu Email"
        />
      </div>
    </div>
    <div class="input-group">
      <label for="registerPassword">Contraseña</label>
      <div class="password-container">
        <i class="fas fa-lock" id="icon-der"></i>
        <input
          v-model="registerPassword"
          :type="showRegisterPassword ? 'text' : 'password'"
          id="registerPassword"
          placeholder="Ingresa tu contraseña"
        />
        <button
          type="button"
          class="toggle-password"
          @click="toggleRegisterPasswordVisibility"
        >
          <i
            :class="showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            id="icon-izq"
          ></i>
        </button>
      </div>
    </div>
    <div class="input-group">
      <label for="confirmPassword">Confirmar Contraseña</label>
      <div class="password-container">
        <i class="fas fa-lock" id="icon-der"></i>
        <input
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          id="confirmPassword"
          placeholder="Confirma tu contraseña"
        />
        <button
          type="button"
          class="toggle-password"
          @click="toggleConfirmPasswordVisibility"
        >
          <i
            :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            id="icon-izq"
          ></i>
        </button>
      </div>
    </div>
    <button @click="handleRegister" class="submit-data">Registrarse</button>
    <p>¿Ya tienes una cuenta? <a @click="switchToLogin">Inicia sesión</a></p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { register } from "../services/authService";

const registerEmail = ref("");
const registerPassword = ref("");
const confirmPassword = ref("");
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);
const errorMessage = ref("");
const emits = defineEmits(["registerSuccess", "switchToLogin"]);

function toggleRegisterPasswordVisibility() {
  showRegisterPassword.value = !showRegisterPassword.value;
}

function toggleConfirmPasswordVisibility() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

async function handleRegister() {
  errorMessage.value = "";
  if (registerPassword.value !== confirmPassword.value) {
    errorMessage.value = "Las contraseñas no coinciden.";
    return;
  }
  try {
    await register(registerEmail.value, registerPassword.value);
    emits("registerSuccess");
    emits("switchToLogin");
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Error desconocido";
  }
}

function switchToLogin() {
  emits("switchToLogin");
}
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";
@import "../assets/auth.css";
</style>
