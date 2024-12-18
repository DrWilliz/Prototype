<template>
  <div class="flex-container h-100">
    <SideNav v-if="IsLoggedIn" />
    <RouterView v-if="IsLoggedIn" />
    <LoginView v-else @login="loginHome" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideNav from './components/SideNav.vue'
import { inject, onMounted, ref } from 'vue'
import LoginView from './views/LoginView.vue'
import router from './router'
import enableMode, { type Mode } from './utility/enableMode'
import axiosInstance from './api/axios'

const IsLoggedIn = ref(false)

function loginHome() {
  console.log('loggers, dude')
  IsLoggedIn.value = true
  router.push('/')
}

onMounted(async () => {
  let mode: Mode = localStorage.getItem('mode') as Mode
  mode ? enableMode(mode) : enableMode('lightmode')

  try {
    await axiosInstance.get('/protected-route')
    IsLoggedIn.value = true
  } catch {
    IsLoggedIn.value = false
  }
})
</script>

<style scoped></style>
