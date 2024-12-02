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
      <a href="login.html">Log out</a>
    </div>

    <!-- Burger menu (visible only on small screens) -->
    <div class="burger-menu-container">
    <div class ="burger-menu-logo">
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
        <a href="login.html">Log out</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: #7C1818;
}
</style>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,  // Menuens status
    };
  },
  methods: {
    toggleMenu() {
      console.log('toggleMenu called');  // Tjek om metoden bliver kaldt
      this.isMenuOpen = !this.isMenuOpen;
      console.log('Menu state is now:', this.isMenuOpen);  // Tjek værdien af isMenuOpen
    },
  },
};
</script>