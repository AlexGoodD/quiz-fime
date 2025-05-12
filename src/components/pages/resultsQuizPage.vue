<template>
  <div>
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-10">Cuestionarios Respondidos</h1>
    <div class="tw-w-[80%]">
      <div
        v-if="userAnswers.length"
        class="tw-grid tw-grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] tw-gap-4"
      >
        <div
          v-for="(userAnswer, index) in userAnswers"
          :key="index"
          class="tw-p-4 tw-border tw-border-[#ccc] tw-rounded-lg tw-cursor-pointer tw-transition tw-duration-500 tw-w-40 tw-h-40 hover:tw-scale-105"
          @click="goToResultPage(userAnswer.id)"
        >
          <p class="tw-text-lg tw-font-bold">
            {{ new Date(userAnswer.timestamp).toLocaleString() }}
          </p>
        </div>
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
  import { AnswerType } from '@/types/Answer'

  const userAnswers = ref<AnswerType[]>([])
  const router = useRouter()

  onMounted(async () => {
    userAnswers.value = await getUserAnswers()
  })

  function goToResultPage(id: string) {
    router.push(`/result/${id}`)
  }
</script>
