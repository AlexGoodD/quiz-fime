<script setup lang="ts">
  import questionItem from '@/components/questionItem.vue'
  import SaveButton from '@/components/saveButton.vue'
</script>

<template>
  <div class="tw-flex tw-justify-center">
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-10">Cuestionario</h1>
  </div>
  <h2 class="tw-mb-10">
    Aqui encontrarás todas las preguntas que se encuentran en tu cuestionario.
  </h2>
  <questionItem />
  <SaveButton />
</template>

<style scoped></style>
