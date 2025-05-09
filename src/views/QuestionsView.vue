<template>
  <h1>Gestión de cuestionario</h1>
  <router-link to="/admin" title="Panel de control">
    texto
  </router-link>
  <h2>Aqui encontrarás todas las preguntas que se encuentran en tu cuestionario.</h2>
  <questionItem/>
</template>

<script setup lang="ts">
import questionItem from "@/components/questionItem.vue"
</script>

<style scoped></style>