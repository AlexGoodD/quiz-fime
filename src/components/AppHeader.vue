<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li v-if="isAuthenticated"><router-link to="/quiz">Quiz</router-link></li>
        <li><router-link to="/result">Result</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li v-if="isAuthenticated"><button @click="handleLogout">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '../services/authService';
import { auth } from '../firebase';
const isAuthenticated = ref(false);
const router = useRouter();
onMounted(() => {
  auth.onAuthStateChanged(user => {
    isAuthenticated.value = !!user;
  });
});
async function handleLogout() {
  try {
    await logout();
    isAuthenticated.value = false;
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
</script>
<style scoped>
header {
  background-color: transparent;
  color: white;
  padding: 10px 0;
  border-bottom: 1px solid red;
}
nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}
nav ul li {
  margin: 0 10px;
}
nav ul li a {
  color: red;
  text-decoration: none;
}
nav ul li button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
}
</style>