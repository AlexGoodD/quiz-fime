<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
    <div
      v-if="userAnswers.length"
      class="tw-mt-[3rem] tw-w-[80%] tw-h-[50rem] tw-p-8 tw-rounded-lg tw-shadow-md tw-text-left tw-ml-[3rem] tw-border tw-border-gray-200"
    >
      <div
        v-for="(userAnswer, index) in userAnswers"
        :key="index"
        :ref="(el) => (userAnswerRefs[index] = el as HTMLElement)"
      >
        <div class="tw-flex tw-justify-start tw-items-center tw-w-[100%] tw-text-gray-500 tw-mb-4">
          <font-awesome-icon :icon="['fas', 'clock']" class="tw-mr-4" />
          <p>
            {{ formatDate(userAnswer.timestamp) }}
          </p>
        </div>
        <div class="tw-flex tw-flex-col">
          <h2 class="tw-text-xl tw-font-medium">Posgrado sugerido</h2>
          <h3 class="tw-text-2xl tw-font-bold">
            {{ userAnswer.posgrado || 'Posgrado no disponible' }}
          </h3>
        </div>
        <div class="tw-mt-4">
          <h3 class="tw-text-xl tw-font-medium tw-mb-4">Resumen de tus respuestas</h3>
          <div
            class="tw-grid tw-grid-cols-2 tw-gap-4 tw-gap-x-[10rem] tw-text-sm tw-pt-4 tw-h-[30rem] tw-overflow-scroll"
          >
            <div class="tw-font-semibold">Preguntas</div>
            <div class="tw-font-semibold">Respuestas</div>
            <template v-for="(answer, idx) in userAnswer.answers" :key="idx">
              <div>{{ answer.question || 'Pregunta no disponible' }}</div>
              <div>{{ answer.answer || 'Respuesta no disponible' }}</div>
            </template>
          </div>
        </div>

        <div class="share-buttons">
          <button
            @click="
              shareOnTwitter(
                '¡Mira mis resultados del quiz de maestrías!: ',
                userAnswer.posgrado || ''
              )
            "
          >
            Compartir en Twitter
          </button>
          <button
            @click="
              shareOnFacebook(
                '¡Mira mis resultados del quiz de maestrías!',
                userAnswer.posgrado || ''
              )
            "
          >
            Compartir en Facebook
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay respuestas disponibles.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getUserAnswers } from '@/services/submitService'
  import { shareOnTwitter, shareOnFacebook } from '@/services/shareService'
  import { UserAnswer } from '@/types/Answer'

  const userAnswers = ref<UserAnswer[]>([])
  const route = useRoute()
  const userAnswerRefs = ref<HTMLElement[]>([])

  function formatDate(timestamp: string): string {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return 'Fecha inválida'

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
    return date.toLocaleDateString('es-ES', options)
  }

  onMounted(async () => {
    const answers = await getUserAnswers()
    userAnswers.value = answers.filter((answer) => answer.id === route.params.id)
    console.log(userAnswers.value)
  })
</script>

<style scoped>
  .share-buttons {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .share-buttons button {
    padding: 10px 20px;
    border: unset;
    border-radius: 15px;
    color: #212121;
    z-index: 1;
    background: #e8e8e8;
    position: relative;
    font-weight: 1000;
    font-size: 13px;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
    overflow: hidden;
    cursor: pointer;
  }

  .share-buttons button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    border-radius: 15px;
    background-color: #212121;
    z-index: -1;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  .share-buttons button:hover {
    color: #e8e8e8;
  }

  .share-buttons button:hover::before {
    width: 100%;
  }
</style>
