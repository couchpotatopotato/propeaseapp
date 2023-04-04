<script>
import { RouterLink, RouterView } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "App",
  data() {
    return {
      user: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    signOut() {
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth, user);
      this.user = false;
      this.$router.push({ name: "landing" });
    },
  },
};
</script>

<template>
  <header v-if="user">
    <!-- hide when not login -->
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

  <div id="pagecomponent">
    <RouterView />
  </div>
</template>

<style scoped>
#pagecomponent {
  margin: 0 150px 150px 100px;
}

header {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 30px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: var(--color-darkblue);
}

nav {
  font-size: 20px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: white;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 3%;
  border-left: 1px solid var(--color-border);
  color: rgb(155, 155, 155);
}

nav button {
  display: inline-block;
  padding: 0 3%;
  border: none;
  border-left: 1px solid var(--color-border);
  background: none;
  color: rgb(155, 155, 155);
}

nav a:hover {
  text-decoration: none;
  color: white;
  transition: 0.4s;
  background-color: transparent;
}
nav button:hover {
  color: white;
  transition: 0.4s;
}

nav a:first-of-type {
  border: 0;
}
</style>
