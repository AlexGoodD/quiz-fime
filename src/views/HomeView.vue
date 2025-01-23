<template>
    <div class="home-container">
      <h1 class="title">Quiz de maestrías</h1>
      <h3 class="subtitle">Responde las preguntas y descubre qué maestría es la ideal para ti</h3>
      <button @click="startQuiz">Comenzar</button>
      <button @click="about" class="about-button">
    <i class="fas fa-info"></i>
  </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  function startQuiz() {
    router.push('/quiz');
  }

  function about() {
    router.push('/about');
  }

  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    padding: 0 1rem;
  }

  .title {
    font-size: 4.5rem;
  }

  .subtitle {
    font-size: 1rem;
    margin-top: -40px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background-color: #37763c;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    width: 15rem;
    transition: transform 0.5s ease;
  }
  
  button:hover {
    background-color: #326136;
    transform: scale(0.9);

  }

  .about-button {
    border-radius: 50%;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    background-color: transparent;
    border: 1px solid #326136;
  }

  .about-button:hover {
    background-color: transparent;
    transform: none;
  }
  </style>