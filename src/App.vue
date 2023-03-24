<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/notif">Notification</RouterLink>
      <RouterLink to="/property">Property</RouterLink>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
    </nav>
  </header>
  <br />

  <RouterView />
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1;
  padding: 30px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 3rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
