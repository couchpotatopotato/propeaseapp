<template>
  <div class="about">
    <h1>PropEase</h1>
  </div>
  <HomeCenter />
</template>

<style scoped>
.about {
  margin-left: 15%;
  margin-top: 11%;
}

h1 {
  font-size: 5rem;
  font-weight: 500;
}
</style>

<script>
import HomeCenter from "../components/Home/HomeCenter.vue";
export default {
  components: {
    HomeCenter,
  },
};
</script>
