<template>
  <div class="about">
    <h1>Profile</h1>
  </div>
  <Profile />
</template>

<style>
.about {
  margin: 30 30 30 30;
  display: flex;
  align-items: center;
}
</style>

<script>
import Profile from "../components/Profile/Profile.vue";

export default {
  components: {
    Profile,
  },
};
</script>
