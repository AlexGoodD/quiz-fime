<template>
  <div>
    <h1>Resultados</h1>
    <div v-if="userAnswers.length">
      <div
        v-for="(userAnswer, index) in userAnswers"
        :key="index"
        :ref="el => (userAnswerRefs[index] = el as HTMLElement)"
      >
        <div class="results-date">
          <h3>Fecha de creación:</h3>
          <p>{{ new Date(userAnswer.timestamp).toLocaleString() }}</p>
        </div>
        <div v-for="(answer, idx) in userAnswer.answers" :key="idx">
          <h3>{{ answer.question || "Pregunta no disponible" }}</h3>
          <p>{{ answer.answer || "Respuesta no disponible" }}</p>
        </div>
        <div class="results-posgrado">
          <h3>La maestría indicada para ti puede ser:</h3>
          <p>{{ userAnswer.posgrado || "Maestría no disponible" }}</p>
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getUserAnswers } from "../../services/submitService";
import { shareOnTwitter, shareOnFacebook } from "../../services/shareService";

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
.results-date,
.results-posgrado {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.results-date p,
.results-posgrado p {
  margin-left: 5px;
}

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
  content: "";
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
