<template>
  <div class="result-view">
    <ResultsQuiz />
  </div>
</template>

<script setup lang="ts">
import ResultsQuiz from "@/components/ResultsQuiz.vue";
</script>

<style scoped>
.result-view {
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
}

@media (max-width: 768px) {
  .result-view {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
