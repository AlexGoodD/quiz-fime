<template>
  <div>
    <h1>Resultados</h1>
    <div v-if="userAnswers.length">
      <div
        v-for="(userAnswer, index) in userAnswers"
        :key="index"
        :ref="el => (userAnswerRefs[index] = el as HTMLElement)"
      >
        <p><strong>Fecha de creación:</strong> {{ new Date(userAnswer.timestamp).toLocaleString() }}</p>
        <div v-for="(answer, idx) in userAnswer.answers" :key="idx">
          <h3>{{ answer.question || 'Pregunta no disponible' }}</h3>
          <p>{{ answer.answer || 'Respuesta no disponible' }}</p>
        </div>
        <div class="share-buttons">
          <button @click="() => shareOnTwitter(index, userAnswerRefs)">Compartir en Twitter</button>
          <button @click="() => shareOnFacebook(index, userAnswerRefs)">Compartir en Facebook</button>
          <button @click="() => downloadImage(index, userAnswerRefs)">Descargar Imagen</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay respuestas disponibles.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getUserAnswers } from '../services/submitService';
import { shareOnTwitter, shareOnFacebook } from '../services/shareService';
import { downloadImage } from '../services/canvasService';

const userAnswers = ref<any[]>([]);
const route = useRoute();
const userAnswerRefs = ref<HTMLElement[]>([]);

onMounted(async () => {
  const answers = await getUserAnswers();
  userAnswers.value = answers.filter(answer => answer.id === route.params.id);
  console.log(userAnswers.value);
});
</script>

<style scoped>
.share-buttons {
  margin-top: 10px;
}

.share-buttons button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.share-buttons button:hover {
  background-color: #0056b3;
}
</style>