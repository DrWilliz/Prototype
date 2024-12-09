<template>
  <div>
    <!-- Original sidebar navigation (hidden on small screens) -->
    <div class="sidenav">
      <div class="jimbojabbo">
        <img src="/img/logo.png" alt="Kubelab icon in Black" />
      </div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <a href="/" @click="logout">Log out</a>
    </div>

    <!-- Burger menu (visible only on small screens) -->
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
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
        <a href="/" @click.prevent="logout">Log out</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: #7c1818;
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import axiosInstance from '@/api/axios'
import {ref} from 'vue'

// const emits = defineEmits(['logout'])
const router = useRouter()
const logo = ref('') 

// export default {
//   data() {
//     return {
//       isMenuOpen: false, // Menuens status
//     }
//   },
//   methods: {
//     toggleMenu() {
//       console.log('toggleMenu called') // Tjek om metoden bliver kaldt
//       this.isMenuOpen = !this.isMenuOpen
//       console.log('Menu state is now:', this.isMenuOpen) // Tjek værdien af isMenuOpen
//     },
//   },
//   }

  
const logout = async () => {
     console.log ("help");
      try {
        // Kalder backend logout endpoint
        const response = await axiosInstance.post('/logout');
        if (response.status === 200) {
          // Gør opmærksom på at parent eller andre komponenter
          emit('logout');

          // Redirect brugeren til login siden
          // router.push('/login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
      }
    };
  

</script>
