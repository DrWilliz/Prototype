<template>
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
</template>

<style scoped>
.router-link-active {
  background-color: #7C1818;
}
</style>
