<template>
  <div>
    <div class="about">PropEase</div>
    <HomeCenter />
  </div>
</template>

<style scoped>
.about {
  /*margin-left: 15%;
  margin-top: 15%;*/
  margin-left: 10%;
  margin-top: 10%;
  font-weight: 700;
  font-size: 100px;
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
