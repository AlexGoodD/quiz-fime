<template>
  <div class="register-container">
    <h2>Registro</h2>
    <div class="input-group">
      <label for="registerEmail">Email</label>
      <div class="input-with-icon">
        <i class="fas fa-envelope"></i>
        <input v-model="registerEmail" type="email" id="registerEmail" placeholder="Ingresa tu Email" />
      </div>
    </div>
    <div class="input-group">
      <label for="registerPassword">Contraseña</label>
      <div class="password-container">
        <i class="fas fa-lock" id="icon-der"></i>
        <input v-model="registerPassword" :type="showPassword ? 'text' : 'password'" id="registerPassword" placeholder="Ingresa tu contraseña" />
        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" id="icon-izq"></i>
        </button>
      </div>
    </div>
    <button @click="handleRegister">Registrarse</button>
    <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión</router-link></p>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { register } from '../services/authService';
const registerEmail = ref('');
const registerPassword = ref('');
const showPassword = ref(false);
const emits = defineEmits(['registerSuccess']);
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
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
@import '@fortawesome/fontawesome-free/css/all.css';
.register-container {
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
</style>