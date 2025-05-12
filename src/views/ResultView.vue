<template>
  <div class="tw-w-[100%] tw-my-0 tw-mx-auto tw-max-w-[1000px]" id="result-view">
    <ResultsQuizPage />
  </div>
</template>

<script setup lang="ts">
  import ResultsQuizPage from '@/components/pages/resultsQuizPage.vue'
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
