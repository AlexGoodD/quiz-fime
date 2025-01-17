<template>
    <div>
        <h1>{{ props.question }}</h1>
        <button @click="selectTrue" class="true">True</button>
        <button @click="selectFalse" class="false">False</button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  question: string;
}>();

const emits = defineEmits(['update:answer']);

function selectTrue() {
  emits('update:answer', true);
  alert('True');
}

function selectFalse() {
  emits('update:answer', false);
  alert('False');
}
</script>

<style scoped>
.true {
  background-color: green;
}

.false {
  background-color: red;
}

</style>