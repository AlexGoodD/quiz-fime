<template>
  <div class="tw-w-[30rem] tw-p-5 tw-mx-auto tw-my-0 tw-border tw-border-[#ccc] tw-rounded-md tw-shadow-md tw-text-center tw-justify-center">
    <h2 class="tw-text-2xl tw-font-black">Registro</h2>
    <div class="tw-mb-4 tw-text-left">
      <label class="tw-block tw-mb-1 tw-text-base tw-text-[#333] tw-font-medium" for="registerEmail">Email</label>
      <div class="tw-relative">
        <i class="fas fa-envelope tw-absolute tw-left-3 tw-top-[50%] -tw-translate-y-[50%] tw-text-[#ccc]"></i>
        <input
          v-model="registerEmail"
          type="email"
          id="registerEmail"
          placeholder="Ingresa tu Email"
          class="tw-w-[100%] tw-pr-2 tw-pt-2 tw-pb-2 tw-pl-8 tw-border tw-border-[#ccc] tw-rounded-md tw-text-base"
        />
      </div>
    </div>
    <div class="tw-mb-4 tw-text-left">
      <label class="tw-block tw-mb-1 tw-text-base tw-text-[#333] tw-font-medium" for="registerPassword">Contraseña</label>
      <div class="tw-relative tw-flex tw-items-center">
        <i class="fas fa-lock tw-absolute tw-left-3 tw-top-[50%] -tw-translate-y-[50%] tw-text-[#ccc]"></i>
        <input
          v-model="registerPassword"
          :type="showRegisterPassword ? 'text' : 'password'"
          id="registerPassword"
          placeholder="Ingresa tu contraseña"
          class="tw-w-[100%] tw-pr-2 tw-pt-2 tw-pb-2 tw-pl-8 tw-border tw-border-[#ccc] tw-rounded-md tw-text-base"
        />
        <button
          type="button"
          @click="toggleRegisterPasswordVisibility"
          class="tw-absolute tw-right-5 tw-top-[50%] -tw-translate-y-[50%] tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-[#666] tw-text-base tw-w-8 hover:tw-text-[#000]"
        >
          <i
            :class="showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            class="tw-absolute tw-r-3 tw-top-[50%] -tw-translate-y-[50%] tw-text-[#ccc]"
          ></i>
        </button>
      </div>
    </div>
    <div class="tw-mb-4 tw-text-left">
      <label class="tw-block tw-mb-1 tw-text-base tw-text-[#333] tw-font-medium" for="confirmPassword">Confirmar Contraseña</label>
      <div class="tw-relative tw-flex tw-items-center">
        <i class="fas fa-lock tw-absolute tw-left-3 tw-top-[50%] -tw-translate-y-[50%] tw-text-[#ccc]"></i>
        <input
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          id="confirmPassword"
          placeholder="Confirma tu contraseña"
          class="tw-w-[100%] tw-pr-2 tw-pt-2 tw-pb-2 tw-pl-8 tw-border tw-border-[#ccc] tw-rounded-md tw-text-base"
        />
        <button
          type="button"
          @click="toggleConfirmPasswordVisibility"
          class="tw-absolute tw-right-5 tw-top-[50%] -tw-translate-y-[50%] tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-[#666] tw-text-base tw-w-8 hover:tw-text-[#000]"
        >
          <i
            :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            class="tw-absolute tw-r-3 tw-top-[50%] -tw-translate-y-[50%] tw-text-[#ccc]"
            />
        </button>
      </div>
    </div>
    <button @click="handleRegister" class="tw-w-[100%] tw-p-3 tw-mb-4 tw-border-none tw-bg-[#000000] tw-text-white tw-rounded-md tw-cursor-pointer tw-text-base tw-transition tw-transform tw-duration-500 tw-ease-in-out hover:tw-bg-[#3f3f3f]">Registrarse</button>
    <p class="tw-mb-4">¿Ya tienes una cuenta? <a class="tw-text-[#0014B3] tw-font-medium tw-cursor-pointer tw-transition-colors tw-duration-500 tw-ease-in-out hover:tw-text-[#4255FF]" @click="switchToLogin">Inicia sesión</a></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/services/authService";

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
@import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
</style>
