<template>
  <div :class="['close-container', { 'animate-background': animateBackground }]">
    <h1 class="tw-text-7xl tw-text-white tw-font-medium">Has finalizado el quiz</h1>
    <h3 class="tw-text-2xl tw-text-white tw-mt-4">En breve saldrá tu resultado</h3>
    <router-link
      :class="[
        'tw-mt-5 tw-py-2.5 tw-px-5 tw-bg-white tw-text-black tw-text-lg tw-font-medium tw-border-none tw-rounded-md tw-inline-block tw-transition tw-duration-500 tw-transform hover:tw-scale-110',
        showButton ? 'tw-opacity-100' : 'tw-opacity-0',
      ]"
      to="/result"
    >
      Ver mis resultados
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const animateBackground = ref(false)
  const showButton = ref(false)

  onMounted(() => {
    setTimeout(() => {
      animateBackground.value = true
    })
    setTimeout(() => {
      showButton.value = true
    }, 1000)
  })
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
    background: linear-gradient(
      to bottom,
      rgb(14, 14, 15) 0%,
      rgb(14, 14, 15) 50%,
      white 50%,
      white 100%
    );
    background-size: 100% 200%;
    background-position: 0% 0%;
    transition: all 0.5s ease;
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

  .result-button:hover {
    transform: scale(1.1);
  }
</style>
