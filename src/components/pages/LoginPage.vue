<template>
  <div class="container">
    <h2>Inicio de sesión</h2>
    <div class="input-group">
      <label for="email">Email</label>
      <div class="input-with-icon">
        <i class="fas fa-envelope"></i>
        <input v-model="email" type="email" id="email" placeholder="Ingresa tu Email" />
      </div>
    </div>
    <div class="input-group">
      <label for="password">Contraseña</label>
      <div class="password-container">
        <i class="fas fa-lock" id="icon-der"></i>
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="Ingresa tu contraseña"
        />
        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" id="icon-izq"></i>
        </button>
      </div>
    </div>
    <button @click="handleLogin" class="submit-data">Iniciar sesión</button>
    <p>¿No tienes una cuenta? <a @click="switchToRegister">Regístrate</a></p>
    <div class="google-login">
      <p>O inicia sesión con</p>
      <button @click="handleGoogleLogin" class="google-login-button">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxS5iRASsr50ASJqYsyAvcew2ICajtSGVkJw&s"
          alt="Google Logo"
        />
        Google
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref} from "vue";
import { login, loginWithGoogle } from "../../services/authService";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorMessage = ref("");
const emits = defineEmits(["loginSuccess", "switchToRegister"]);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function handleLogin() {
  errorMessage.value = "";
  try {
    await login(email.value, password.value);
    emits("loginSuccess");
  } catch (error) {
    errorMessage.value = (error as Error).message;
  }
}

async function handleGoogleLogin() {
  try {
    await loginWithGoogle();
    emits("loginSuccess");
  } catch (error) {
    errorMessage.value = "Google login failed: " + (error as Error).message;
  }
}

function switchToRegister() {
  emits("switchToRegister");
}
</script>

<style scoped>
@import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
@import "../../assets/auth.css";

.google-login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.google-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: black;
  font-size: 12px;
  border: 1px solid #ccc;
  padding: 5px 10px;
  width: 50%;
}

.google-login-button img {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}
</style>
