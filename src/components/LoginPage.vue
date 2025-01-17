<template>
  <div class="login-container">
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
        <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" placeholder="Ingresa tu contraseña" />
        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" id="icon-izq"></i>
        </button>
      </div>
    </div>
    <button @click="handleLogin">Iniciar sesión</button>
    <p>¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link></p>
    <div class="google-login">
      <p>O inicia sesión con</p>
      <button @click="handleGoogleLogin" class="google-login">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxS5iRASsr50ASJqYsyAvcew2ICajtSGVkJw&s" alt="Google Logo" />
        Google
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { login, loginWithGoogle } from '../services/authService';
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const emits = defineEmits(['loginSuccess']);
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
async function handleLogin() {
  try {
    await login(email.value, password.value);
    emits('loginSuccess');
  } catch (error) {
    console.error('Login failed:', error);
  }
}
async function handleGoogleLogin() {
  try {
    await loginWithGoogle();
    emits('loginSuccess');
  } catch (error) {
    console.error('Google login failed:', error);
  }
}
</script>
<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
.login-container {
  width: 300px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.input-group {
  margin-bottom: 15px;
  text-align: left;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
  color: #333;
  font-weight: 520;
}
.input-with-icon {
  position: relative;
}
.input-with-icon i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}
.input-with-icon input {
  width: calc(100% - 40px);
  padding: 8px 8px 8px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
.password-container {
  position: relative;
  display: flex;
  align-items: center;
}
#icon-der {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}
#icon-izq {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}
.password-container input {
  width: calc(100% - 40px);
  padding: 8px 30px 8px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
.password-container .toggle-password {
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 16px;
}
.password-container .toggle-password:hover {
  color: #000;
}
button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #0056b3;
}
.google-login button {
  background-color: transparent;
  color: black;
  font-size: 12px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 50%;
}
.google-login img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>