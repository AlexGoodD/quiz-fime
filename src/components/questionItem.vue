<template>
  <div class="container-question">
    <div class="question-header bg-red-500">
    <h2>Pregunta 1</h2>
      <button @click="submitQuestion">Enviar</button>
      <button >Eliminar</button>
    </div>
    <div class="input-question">
      <label for="questionText">Pregunta</label>
      <input id="questionText" type="text" v-model="questionText" placeholder="Escribe tu pregunta aquí" />
    </div>

    <div class="input-question-type">
      <label for="questionType">Tipo de pregunta</label>
      <select id="questionType" v-model="questionType">
        <option value="slider">Selector</option>
        <option value="multipleChoice">Selección múltiple</option>
        <option value="trueFalse">Verdadero/Falso</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { addQuestion } from '@/services/questionService';

const questionText = ref('');
const questionType = ref('slider');

async function submitQuestion() {
  try {
    await addQuestion(questionText.value, questionType.value);
    alert('Pregunta enviada con éxito.');
    questionText.value = '';
    questionType.value = 'slider';
  } catch {
    alert('Hubo un error al enviar la pregunta.');
  }
}
</script>

<style scoped>
.container-question {
  display: flex;
  text-align: left;
  flex-direction: column;
  gap: 10px;
  margin: 0 10rem 0 10rem;
  border: 1px solid #ccc;
  padding: 0 3rem 2rem 3rem;
  border-radius: 1rem;
}

label {
  font-weight: bold;
}

input, select {
  padding: 5px;
  font-size: 14px;
}

.input-question {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
}

.input-question-type {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
}
#questionText{
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
}
#questionType {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 14px;
  background-color: white;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 2rem;
}
</style>