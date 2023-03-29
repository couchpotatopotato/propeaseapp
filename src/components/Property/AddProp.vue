<template>
  <div class="card">
    <img src="src/components/Property/AddPropImg.jpeg" alt="Card Image" />
    <div class="form-group">
      <label for="prop_name">Name:</label>
      <input type="text" id="input1" v-model="prop_name" />
      <label for="prop_address">Address:</label>
      <input type="text" id="input2" v-model="prop_address" />
      <label for="owner_email">Owner's Email:</label>
      <input type="text" id="input3" v-model="owner_email" />
      <RouterLink to="/property">
        <button type="add" @click="saveCard">Add</button>
      </RouterLink>
    </div>
  </div>
</template>

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
// import ToastPlugin from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-bootstrap.css';

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
      owner_email: "",
    };
  },
  methods: {
    // mounted() {
    //   this.$toast = ToastPlugin;
    //   this.$toast.open('Component mounted!');
    //   // Vue.use(ToastPlugin);
    // },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    saveCard() {
      if (this.validateEmail(this.owner_email)) {
        // email is valid, do something
        const card = addDoc(collection(db, "Property"), {
          prop_name: this.prop_name,
          prop_address: this.prop_address,
          isRented: true,
          owner_email: this.owner_email,
        });
        console.log(card.id);
        // } else if (this.$toast) {
        //   this.$toast.error('Invalid email address');
      } else {
        console.log("fail");
        // email is not valid, show error message
        // this.$toast.error('Invalid email address');
      }
    },
  },
};
</script>
