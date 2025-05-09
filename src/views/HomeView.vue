<template>
  <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[100vh] tw-text-center tw-py-0 tw-px-4">
    <h1 class="tw-text-[5.5rem] tw-font-black tw-mb-2">Quiz de maestrías</h1>
    <h3 class="tw-text-lg tw-mb-2">
      Responde las preguntas y descubre qué maestría es la ideal para ti
    </h3>
    <button
        class="tw-mt-[20px] tw-px-[10px] tw-py-[20px] tw-flex tw-items-center tw-justify-center tw-border-none tw-bg-[#37763c] tw-text-white tw-rounded-[5px] tw-cursor-pointer tw-w-[12rem] tw-h-[1rem] tw-text-[16px] tw-shadow-md tw-transition-transform tw-duration-500 tw-ease-in-out hover:tw-bg-[#326136] hover:tw-scale-90"
        @click="startQuiz"
    >
      Comenzar
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function startQuiz() {
  router.push("/quiz");
}
</script>