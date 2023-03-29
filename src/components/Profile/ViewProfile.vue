<template>
  <div class="card">
    <form>
      <label for="fullname">Full Name</label><br />
      <h6>{{ fullname }}</h6>
      <label for="contact">Contact Number</label><br />
      <h6>{{ number }}</h6>
      <label for="email">Email</label><br />
      <h6>{{ email }}</h6>
    </form>
    <br />
    <button class="button" @click="showEdit">EDIT</button>
  </div>
</template>

<style scoped>
.card {
  font-size: 1.7em;
}

.button {
  font-size: 1rem;
}
</style>

<script>
import firebaseApp from "@/firebase.js";
import { getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      fullname: "",
      number: "",
      email: "",
    };
  },

  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
    await this.fetchAndUpdateData(this.useremail);
  },

  emits: ["showEdit"],

  methods: {
    showEdit() {
      this.$emit("showEdit", true);
    },

    async fetchAndUpdateData(useremail) {
      const info = await getDoc(doc(db, "Owner", String(useremail)));
      const data = info.data();
      this.fullname = data["Name"];
      this.number = data["Phone"];
      this.email = data["Email"];
    },
  },
};
</script>
