<template>
  <div :class="['close-container', { 'animate-background': animateBackground }]">
    <h1 class="title">Has finalizado el quiz</h1>
    <h3 class="subtitle">En breve saldrá tu resultado</h3>
    <router-link v-if="showButton" to="/result" class="result-button">Ver mis resultados</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const animateBackground = ref(false);
const showButton = ref(false);

onMounted(() => {
  setTimeout(() => {
    animateBackground.value = true;
  }, );
  setTimeout(() => {
    showButton.value = true;
  }, 1000);
});
</script>

<style scoped>
.close-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 0 1rem;
  background: linear-gradient(to bottom, rgb(14, 14, 15) 0%, rgb(14, 14, 15) 50%, white 50%, white 100%);  background-size: 100% 200%;
  background-position: 0% 0%;
}

.animate-background {
  animation: backgroundScroll 0.4s ease;
}

@keyframes backgroundScroll {
  0% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.title {
  font-size: 4.5rem;
  color: white;
}

.subtitle {
  font-size: 1.5rem;
  margin-top: -40px;
  color: white;
}
.result-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: white;
  color: rgb(14, 14, 15);
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  transition: transform 0.5s ease;
}

.result-button:hover {
  transform: scale(1.1);
}
</style>