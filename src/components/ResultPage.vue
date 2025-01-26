<template>
  <div>
    <h1>Resultados</h1>
    <div v-if="userAnswers.length">
      <div
        v-for="(userAnswer, index) in userAnswers"
        :key="index"
        :ref="el => (userAnswerRefs[index] = el as HTMLElement)"
      >
        <p>
          <strong>Fecha de creación:</strong>
          {{ new Date(userAnswer.timestamp).toLocaleString() }}
        </p>
        <div v-for="(answer, idx) in userAnswer.answers" :key="idx">
          <h3>{{ answer.question || "Pregunta no disponible" }}</h3>
          <p>{{ answer.answer || "Respuesta no disponible" }}</p>
        </div>
        <p>La maestría indicada para ti puede ser {{ userAnswer.posgrado }}</p>
        <div class="share-buttons">
          <button
            @click="
              shareOnTwitter(
                '¡Mira mis resultados del quiz de maestrías!',
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getUserAnswers } from "../services/submitService";
import { shareOnTwitter, shareOnFacebook } from "../services/shareService";

interface Answer {
  question: string;
  answer: string | number;
}

interface UserAnswer {
  id: string;
  timestamp: string;
  answers: Answer[];
  posgrado?: string;
}

const userAnswers = ref<UserAnswer[]>([]);
const route = useRoute();
const userAnswerRefs = ref<HTMLElement[]>([]);

onMounted(async () => {
  const answers = await getUserAnswers();
  userAnswers.value = answers.filter((answer) => answer.id === route.params.id);
  console.log(userAnswers.value);
});
</script>

<style scoped>
.share-buttons {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
}
</style>
