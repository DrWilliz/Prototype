<template>
  <div>
    <!-- Original sidebar navigation (hidden on small screens) -->
    <div class="sidenav">
      <div class="jimbojabbo">
        <img src="/img/logo.png" alt="Kubelab icon in Black" />
      </div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
      <!-- <RouterLink to="/projects">Projects</RouterLink> -->
      <RouterLink to="/admin">Admin</RouterLink>
      <a href="/" @click="logout">Log out</a>
    </div>

    <!-- Burger menu -->
    <div class="burger-menu-container">
      <div class="burger-menu-logo">
        <div class="burger-menu" @click="toggleMenu">
          <div class="burger-line"></div>
          <div class="burger-line"></div>
          <div class="burger-line"></div>
        </div>
        <div class="jimbojabbo">
          <img src="/img/logo.png" alt="Kubelab icon in Black" />
        </div>
      </div>

      <!-- Menu links, displayed when isMenuOpen is true -->
      <div v-show="isMenuOpen" class="burger-menu-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <!-- <RouterLink to="/projects">Projects</RouterLink> -->
        <RouterLink to="/admin">Admin</RouterLink>
        <a href="/" @click.prevent="logout">Log out</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axiosInstance from '@/api/axios'
import { ref } from 'vue'

const router = useRouter()
const isMenuOpen = ref(false) // Menuens status som reactive state

// Funktion til at skifte menuens tilstand
const toggleMenu = () => {
  console.log('toggleMenu called') // Debugging
  isMenuOpen.value = !isMenuOpen.value
  console.log('Menu state is now:', isMenuOpen.value) // Debugging
}

// Logout-funktion
const logout = async () => {
  console.log('help')
  try {
    const response = await axiosInstance.post('/logout')
    if (response.status === 200) {
      // Redirect brugeren til login siden
      router.push('/login')
    }
  } catch (error) {
    console.error('Logout failed:', error)
    alert('Logout failed. Please try again.')
  }
}
</script>