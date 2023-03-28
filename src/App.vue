<script>
import { RouterLink, RouterView } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      user: false,
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    })
  },
  methods: {
    signOut() {
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth, user);
      this.user = false;
      this.$router.push({ name: 'landing' });
    }
  }
}
</script>

<template>
  <header v-if="user"> <!-- hide when not login -->
      <nav> 
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/notif">Notification</RouterLink>
        <RouterLink to="/property">Property</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <button id="logoutBtn" @click="signOut()">Logout</button>
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

nav button {
  display: inline-block;
  padding: 0 3rem;
  border: none;
  border-left: 1px solid var(--color-border);
  background: none;
  color: var(--color-lightblue);
}

nav button:hover {
  text-decoration: underline;
  color: #0056b3;
  background-color: hsla(209, 100%, 37%, 0.097);
  transition: 0.4s;
}

nav a:first-of-type {
  border: 0;
}
</style>
