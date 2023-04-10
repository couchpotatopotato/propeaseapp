<template>
  <div class="card">
    <form>
      <label for="fullname">Full Name</label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        :value="fullname"
      /><br />

      <label for="contact">Contact Number</label>
      <input type="text" id="contact" name="contact" :value="number" /><br />
    </form>
    <br />
    <div class="flexcontainer">
      <button class="button" @click="showView">BACK</button>
      <button class="button" @click="writeUserData()">SAVE</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 50%;
  font-size: 1.7em;
}
.button {
  width: 100%;
  font-size: 1rem;
}

input[type="text"] {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 0 20px 0;
  font-size: 15px;
}
</style>

<script>
import firebaseApp from "@/firebase.js";
import { getDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      fullname: "",
      number: "",
      useremail: "",
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
  emits: ["showView"],

  methods: {
    showView() {
      this.$emit("showView", true);
    },

    async fetchAndUpdateData(useremail, userType) {
      const info = await getDoc(doc(db, userType, useremail));
      const data = info.data();
      this.fullname = data["Name"];
      this.number = data["Phone"];
    },

    writeUserData() {
      let name = document.getElementById("fullname").value;
      let phone = document.getElementById("contact").value;

      const docRef = doc(db, "Owner", this.useremail);
      const data = {
        Name: name,
        Phone: phone,
      };

      updateDoc(docRef, data)
        .then((docRef) => {
          alert("Details updated successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
