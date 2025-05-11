<template>
  <div>
    <h1 class="tw-text-4xl tw-mt-10 tw-font-bold tw-mb-10">Cuestionarios Respondidos</h1>
    <div class="tw-w-[80%]">
      <div v-if="userAnswers.length" class="tw-grid tw-grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] tw-gap4">
        <div
          v-for="(userAnswer, index) in userAnswers"
          :key="index"
          class="tw-p-4 tw-border tw-border-[#ccc] tw-rounded-lg tw-cursor-pointer tw-transition tw-duration-500 tw-w-40 tw-h-40 hover:tw-scale-105"
          @click="goToResultPage(userAnswer.id)"
        >
          <p class="tw-text-lg tw-font-bold">{{ new Date(userAnswer.timestamp).toLocaleString() }}</p>
        </div>
      </div>
      <div v-else>
        <p>No hay respuestas disponibles.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUserAnswers } from "../services/submitService";

interface UserAnswer {
  id: string;
  timestamp: string;
}

const userAnswers = ref<UserAnswer[]>([]);
const router = useRouter();

onMounted(async () => {
  const answers = await getUserAnswers();
  userAnswers.value = answers;
});

function goToResultPage(id: string) {
  router.push(`/result/${id}`);
}
</script>
