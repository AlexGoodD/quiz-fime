<template>
  <div class="item-container">
    <h3>{{ props.title }}</h3>
    <p>{{ props.result }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  title: string;
  result: number | string;
}>();
</script>

<style scoped>
.item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 225px;
  height: 225px;
  border: 1px solid #ccc;
  border-radius: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 10px;
  position: relative;
}
h3 {
  margin: 0;
  font-size: 0.85rem;
  position: absolute;
  top: 20px;
  left: 15px;
}
p {
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
}
</style>
