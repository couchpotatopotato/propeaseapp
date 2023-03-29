<template>
  <div class="card">
    <form>
      <label for="fullname">Full Name</label><br />
      <input
        type="text"
        id="fullname"
        name="fullname"
        value="default value"
      /><br />

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
  padding: 5% 10%;
  font-size: 1.7em;
}
.button {
  font-size: 1rem;
}

input[type="text"] {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 1%;
  margin: 0 0 20px 0;
}
</style>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      useremail: "",
      tableRows: [],
      totalProfit: 0,
    };
  },
  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
    await this.fetchAndUpdateData(this.useremail);
  },
  emits: ["showView"],

  methods: {
    showView() {
      this.$emit("showView", true);
    },
  },
};
</script>
