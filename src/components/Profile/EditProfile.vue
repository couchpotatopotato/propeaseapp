<template>
  <div class="card">
    <form>
      <label for="fullname">Full Name</label><br />
      <input type="text" id="fullname" name="fullname" /><br />

      <label for="contact">Contact Number</label><br />
      <input type="text" id="contact" name="contact" /><br />

      <label for="email">Email</label><br />
      <input type="text" id="email" name="email" /><br />

      <label for="password">Password</label><br />
      <input type="text" id="password" name="password" /><br />
    </form>
    <br />
    <button class="button" @click="showView">BACK</button>

    <button class="button">SUBMIT</button>
  </div>
</template>

<style scoped>
.card {
  padding: 8%;
  font-size: 1.7em;
}
</style>

<script>
export default {
  emits: ["showView"],

  methods: {
    showView() {
      this.$emit("showView", true);
    },
  },
};
</script>
