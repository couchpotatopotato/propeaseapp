<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/notif">Notification</RouterLink>
        <RouterLink to="/property">Property</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
    </div>
  </header>
  <br />

  <RouterView />
</template>

<style>
nav {
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
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
