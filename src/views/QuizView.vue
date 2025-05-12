<script setup lang="ts">
  import { onMounted, computed, ref } from 'vue'
  import QuizPage from '../components/pages/quizPage.vue'
  import {
    nextQuestion,
    prevQuestion,
    loadQuestions,
    currentIndex,
    questions,
    answers,
  } from '@/services/quizService'
  import { submitAnswers } from '@/services/submitService'

  const loading = ref(true)

  const progress = computed(() => {
    return questions.value.length ? ((currentIndex.value + 1) / questions.value.length) * 100 : 0
  })

  async function handleSubmitAnswers() {
    try {
      const formattedAnswers = questions.value.map((q, index) => ({
        question: q.question,
        answer: answers.value[index],
      }))
      await submitAnswers(formattedAnswers)
      alert('Respuestas enviadas con éxito')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Error al enviar las respuestas')
    }
  }

  onMounted(async () => {
    await loadQuestions()
    loading.value = false
  })
</script>

<template>
  <div
    class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[100vh]"
    v-if="!loading && questions.length"
  >
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>

    <div class="tw-absolute tw-top-[5rem] tw-right-12 tw-text-xl">
      Pregunta {{ currentIndex + 1 }} de {{ questions.length }}
    </div>

    <QuizPage />

    <div class="tw-flex tw-justify-center tw-items-center tw-mt-5 tw-gap-12">
      <button
        @click="prevQuestion"
        :disabled="currentIndex === 0"
        class="tw-flex tw-items-center tw-justify-center tw-h-10 tw-text-base tw-w-[100%] tw-px-5 tw-border-none tw-rounded-2xl tw-transition tw-transform tw-duration-500"
        :class="
          currentIndex === 0
            ? 'tw-bg-[#212122] tw-text-white tw-bg-opacity-50 tw-cursor-none tw-pointer-events-none'
            : 'tw-bg-[#212122] tw-text-white hover:tw-scale-110'
        "
      >
        Anterior
      </button>

      <button
        v-if="currentIndex < questions.length - 1"
        @click="nextQuestion"
        class="tw-flex tw-items-center tw-justify-center tw-h-10 tw-text-base tw-w-[100%] tw-px-5 tw-border-none tw-bg-[#212122] tw-text-white tw-rounded-2xl tw-transition tw-transform tw-duration-500 hover:tw-scale-110"
      >
        Siguiente
      </button>

      <button
        v-else
        @click="handleSubmitAnswers"
        class="tw-flex tw-items-center tw-justify-center tw-h-10 tw-text-base tw-w-[100%] tw-px-5 tw-border-none tw-bg-[#212122] tw-text-white tw-rounded-2xl tw-transition tw-transform tw-duration-500 hover:tw-scale-110"
      >
        Enviar
      </button>
    </div>
  </div>

  <div v-else class="tw-text-xl tw-font-semibold tw-animate-pulse">Cargando preguntas...</div>
</template>

<style scoped>
  .progress-bar-container {
    display: block;
    justify-content: center;
    width: 50vw;
    height: 20px;
    background-color: #c6c6c6;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }

  @media (max-height: 500px) {
    .progress-bar-container {
      bottom: 30px;
    }
  }

  .progress-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .progress-bar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    background-size: 20px 20px;
    animation: move 1s linear infinite;
  }

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 20px;
    }
  }
</style>
