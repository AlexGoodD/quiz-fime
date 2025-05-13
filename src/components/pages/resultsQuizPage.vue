<template>
  <div class="tw-w-[86vw] -tw-ml-[8rem]">
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-9 tw-text-left">Tus Cuestionarios</h1>
    <div class="tw-w-full">
      <div v-if="userAnswers.length" class="tw-grid tw-grid-cols-2 tw-gap-20">
        <ResultsItem
          v-for="(userAnswer, index) in userAnswers"
          :key="index"
          :timestamp="userAnswer.timestamp"
          :id="userAnswer.id"
          :posgrado="userAnswer.posgrado"
          @view-details="goToResultPage"
        />
      </div>
      <div v-else>
        <p>No hay respuestas disponibles.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getUserAnswers } from '@/services/submitService'
  import { UserAnswer } from '@/types/Answer'
  import ResultsItem from '@/components/items/resultsItem.vue'

  const userAnswers = ref<UserAnswer[]>([])
  const router = useRouter()

  onMounted(async () => {
    userAnswers.value = await getUserAnswers()
  })

  function goToResultPage(id: string) {
    router.push(`/result/${id}`)
  }
</script>
