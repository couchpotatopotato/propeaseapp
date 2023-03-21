<template>
  <div class="about">
    <h1>PropEase</h1>
  </div>
  <HomeCenter />
</template>

<style scoped>
.about {
  margin-top: 10em;
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
