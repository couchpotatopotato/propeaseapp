<template>
  <div class="card">
    <form>
      <label for="fullname">Full Name</label><br />
      <input
        type="text"
        id="fullname"
        name="fullname"
        :value="fullname"
      /><br />

      <label for="contact">Contact Number</label><br />
      <input type="text" id="contact" name="contact" :value="number" /><br />
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
import firebaseApp from "@/firebase.js";
import { getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      fullname: "",
      number: "",
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

    async fetchAndUpdateData(useremail) {
      const info = await getDoc(doc(db, "Owner", String(useremail)));
      const data = info.data();
      this.fullname = data["Name"];
      this.number = data["Phone"];
    },
  },
};
</script>
