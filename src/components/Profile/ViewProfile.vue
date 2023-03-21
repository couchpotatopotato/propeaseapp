<template>
  <div class="card">
    <form>
      <label for="fullname">Full Name</label><br />
      <h6>Name</h6>
      <label for="contact">Contact Number</label><br />
      <h6>Contact</h6>
      <label for="email">Email</label><br />
      <h6>Email</h6>
      <label for="password">Password</label><br />
      <h6>**********</h6>
    </form>
    <br />
    <button class="button" @click="showEdit">EDIT</button>
  </div>
</template>

<style scoped>
.card {
  padding: 10%;
  font-size: 1.7em;
}
</style>

<script>
export default {
  emits: ["showEdit"],

  methods: {
    showEdit() {
      this.$emit("showEdit", true);
    },
  },
};
</script>
