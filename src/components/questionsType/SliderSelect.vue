<template>
  <div class="slider-container">
    <h1>{{ question }}</h1>
    <input
      type="range"
      :min="min"
      :max="max"
      v-model="sliderValue"
      @input="updateValue"
      :style="{
        '--value': sliderValue,
        '--min': min,
        '--max': max,
      }"
      class="slider"
    />
    <div class="tickmarks">
      <span
        v-for="n in max - min + 1"
        :key="n"
        :data-active="n + min - 1 <= sliderValue"
        :class="{
          tickmark: true,
          'tickmark--first': n === 1,
          'tickmark--last': n + min - 1 === sliderValue,
        }"
      >
      </span>
    </div>
    <div class="slider-value">{{ sliderValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { useSliderQuestion } from "../../services/questionService";

const props = defineProps<{
  question: string;
  modelValue: number;
  min: number;
  max: number;
}>();
const emits = defineEmits<{
  (event: "update:modelValue", value: number): void;
}>();

const { sliderValue, updateValue } = useSliderQuestion(props, emits);
</script>

<style scoped>
.slider-container {
  position: relative;
  justify-content: center;
  width: 80%;
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  background: linear-gradient(
    to right,
    #4caf50 0%,
    #4caf50 calc((var(--value) - var(--min)) / (var(--max) - var(--min)) * 100%),
    #ddd calc((var(--value) - var(--min)) / (var(--max) - var(--min)) * 100%),
    #ddd 100%
  );
  border-radius: 5px;
  outline: none;
  transition: background 0.3s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #4caf50;
  cursor: pointer;
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #4caf50;
  cursor: pointer;
  border-radius: 50%;
}

.tickmarks {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  position: relative;
}

.tickmark {
  position: relative;
  width: 2px;
  height: 10px;
  background: #ddd;
  transition: background 0.3s, height 0.5s;
  height: 10px;
}

.tickmark[data-active="true"] {
  background: #4caf50;
}

.tickmark--first[data-active="true"],
.tickmark--last[data-active="true"] {
  height: 20px;
}

.slider-value {
  position: relative;
  top: 10px;
}
</style>
