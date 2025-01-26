<template>
  <div>
    <h1>{{ props.question }}</h1>
    <div class="buttons-trueFalse">
      <button
        @click="() => updateValue('Verdadero', emits)"
        :class="{ active: modelValue === 'Verdadero' }"
        class="true"
      >
        Verdadero
      </button>
      <button
        @click="() => updateValue('Falso', emits)"
        :class="{ active: modelValue === 'Falso' }"
        class="false"
      >
        Falso
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useTrueFalseQuestion } from "../services/questionService";

const props = defineProps<{
  question: string;
  modelValue: string | null;
}>();
const emits = defineEmits(["update:modelValue"]);

const { updateValue } = useTrueFalseQuestion(props);
</script>

<style scoped>
.buttons-trueFalse {
  display: flex;
  justify-content: center;
}

.true,
.false {
  color: black;
  padding: 30px 20px;
  width: 100%;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 10px;
  margin: 5px;
  background-color: transparent;
  transition: all 0.5s ease;
}

.true:hover,
.false:hover {
  transform: translateY(-5px);
}

.true {
  border: 1px solid rgb(125, 200, 125);
}

.false {
  border: 1px solid rgb(202, 104, 104);
}

.active {
  transform: translateY(-5px);
  background-color: #f8f8f8;
}
</style>
