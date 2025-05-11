<template>
  <div class="tw-w-[100%] tw-my-0 tw-mx-auto tw-max-w-[1000px]" id="result-view">
    <ResultsQuiz />
  </div>
</template>

<script setup lang="ts">
import ResultsQuiz from "@/components/ResultsQuiz.vue";
</script>

<style>
@media (max-width: 768px) {
  #result-view {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
