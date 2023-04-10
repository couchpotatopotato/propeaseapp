<template>
  <div class="card">
    <img src="src/components/Property/AddPropImg.jpeg" alt="Card Image" />
    <div class="form-group">
      <label for="prop_name">Name:</label>
      <input type="text" id="input1" v-model="prop_name" />
      <label for="prop_address">Address:</label>
      <input type="text" id="input2" v-model="prop_address" />
      <RouterLink to="/property">
        <button type="add" @click="saveCard">Add</button>
      </RouterLink>
    </div>
  </div>
</template>
0--
<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.card img {
  float: left;
  margin-right: 1rem;
  width: 60%;
  height: 60%;
  object-fit: cover;
}

.form-group {
  margin-left: 1rem;
  height: 50%;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-top: 2rem;
  width: 15%;
}

.card-content {
  display: flex; /* Add this to use flexbox layout */
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}
</style>

<script>
import firebaseApp from "@/firebase.js";
import { collection, getFirestore } from "firebase/firestore";
import { doc, addDoc } from "firebase/firestore";
import { useToast } from "vue-toast-notification";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "vue-toast-notification/dist/theme-bootstrap.css";

const db = getFirestore(firebaseApp);

export default {
  props: {
    title: {
      type: String,
      default: "Card Title",
    },
  },
  data() {
    return {
      prop_name: "",
      prop_address: "",
      // owner_email: "",
    };
  },
  mounted() {
    this.$toast = useToast();
    // this.$toast.open('Component mounted!');
    // this.$toast.error('Error')
    console.log(this.$toast);
    // Vue.use(ToastPlugin);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.useremail = user.email;
      } else {
        // User is signed out
      }
    });
  },
  methods: {
    saveCard() {
      if (this.prop_name == "" || this.prop_address == "") {
        this.$toast.error("Unfilled Fields!");
      } else {
        const card = addDoc(collection(db, "Property"), {
          PropName: this.prop_name,
          PropAddress: this.prop_address,
          IsRented: false,
          OwnerEmail: this.useremail,
        });
      }
    },
  },
};
</script>
