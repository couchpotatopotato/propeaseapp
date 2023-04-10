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
  width: 50%;
}

.button {
  font-size: 1rem;
}
</style>

<script>
import firebaseApp from "@/firebase.js";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.useremail = user.email;
        let userType = "";
        const docRef = doc(db, "Owner", this.useremail);
        getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            // the user is an Owner
            userType = "Owner";
          } else {
            // the user is a Tenant
            userType = "Tenant";
          }
          this.fetchAndUpdateData(this.useremail, userType);
        });
      } else {
        // User is signed out
      }
    });
  },

  emits: ["showEdit"],

  methods: {
    showEdit() {
      this.$emit("showEdit", true);
    },

    async fetchAndUpdateData(useremail, userType) {
      const info = await getDoc(doc(db, userType, useremail));
      const data = info.data();
      this.fullname = data["Name"];
      this.number = data["Phone"];
      this.email = info.id;
    },
  },
};
</script>
