<template>
  <div class="sidenav">
    <div class="jimbojabbo">
      <img src="/img/cubelab-icon-black.png" alt="Kubelab icon in Black" />
      <p>Kubelab</p>
    </div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/admin">Admin</RouterLink>
    <a href="login.html">Log out</a>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: var(--base-variant);
}
</style>
