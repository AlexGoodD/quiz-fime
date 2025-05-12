<template>
  <div class="tw-w-[30rem] tw-p-5 tw-mx-auto tw-my-0 tw-border tw-border-[#ccc] tw-rounded-md tw-shadow-md tw-text-center tw-justify-center">
    <h2 class="tw-text-2xl tw-font-black">Inicio de sesión</h2>
    <div class="tw-mb-4 tw-text-left"> <!--Input group-->
      <label class="tw-block tw-mb-1 tw-text-base tw-text-[#333] tw-font-medium" for="email">Email</label> <!--Input group label -->
      <div class="tw-relative"> <!--Input group > Input with icon-->
        <i class="fas fa-envelope tw-absolute tw-left-3 tw-top-[50%] -tw-translate-y-[50%] tw-text-[#ccc]"></i> <!--Input group > Input with icon i-->
        <input class="tw-w-[100%] tw-pr-2 tw-pt-2 tw-pb-2 tw-pl-8 tw-border tw-border-[#ccc] tw-rounded-md tw-text-base" v-model="email" type="email" id="email" placeholder="Ingresa tu Email" /> <!--Input group > Input with icon > input-->
      </div>
    </div>
    <div class="tw-mb-4 tw-text-left"> <!--Input group-->
      <label class="tw-block tw-mb-1 tw-text-base tw-text-[#333] tw-font-medium" for="password">Contraseña</label> <!--Input group label-->
      <div class="tw-relative tw-flex tw-items-center"> <!--Password container-->
        <i class="fas fa-lock tw-absolute tw-left-3 tw-top-[50%] -tw-translate-y-[50%] tw-text-[#ccc]"></i> <!--Icon der-->
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="Ingresa tu contraseña"
          class="tw-w-[100%] tw-pr-2 tw-pt-2 tw-pb-2 tw-pl-8 tw-border tw-border-[#ccc] tw-rounded-md tw-text-base"
        /> <!--Password container > input-->
        <button type="button" class="tw-absolute tw-right-5 tw-top-[50%] -tw-translate-y-[50%] tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-[#666] tw-text-base tw-w-8 hover:tw-text-[#000]" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="tw-absolute tw-r-3 tw-top-[50%] -tw-translate-y-[50%] tw-text-[#ccc]"></i> <!-- Icon izq -->
        </button> <!--Password container > toggle password/hover-->
      </div>
    </div>
    <button @click="handleLogin" class="tw-w-[100%] tw-p-3 tw-mb-4 tw-border-none tw-bg-[#000000] tw-text-white tw-rounded-md tw-cursor-pointer tw-text-base tw-transition tw-transform tw-duration-500 tw-ease-in-out hover:tw-bg-[#3f3f3f]">Iniciar sesión</button> <!--Submit data/hover -->
    <p class="tw-mb-4">¿No tienes una cuenta? <a class="tw-text-[#0014B3] tw-font-medium tw-cursor-pointer tw-transition-colors tw-duration-500 tw-ease-in-out hover:tw-text-[#4255FF]" @click="switchToRegister">Regístrate</a></p> <!-- a -->
    <div class="google-login">
      <p class="tw-mb-4">O inicia sesión con</p>
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
import { login, loginWithGoogle } from "@/services/authService";

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
