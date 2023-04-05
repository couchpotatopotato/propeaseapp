<template>
    <div class="card">
      <figure>
        <img src="@/components/Property/AddPropImg.jpeg" alt="Image description">
        <figcaption>Property Address</figcaption>
      </figure>
      <!-- <img src="src/components/Property/AddPropImg.jpeg" alt="Card Image" />
      <h5> Property Address </h5> -->
      <div class="form-group">
        <label for="tenant_email">Tenant Email:</label>
        <input type="text" id="input1" v-model="tenant_email" />
        <label for="rental">Monthly Rental Cost:</label>
        <input type="text" id="input2" v-model="rental" />
        <label for="first_pay_date">First Payment Date:</label>
        <input type="text" id="input3" v-model="first_pay_date" />
        <label for="last_pay_date">Number of Payment Months</label>
        <input type="text" id="input4" v-model="num_payment_months" />
        <RouterLink to="/property">
          <button type="add" @click="saveCard">Add</button>
        </RouterLink>
      </div>
    </div>
  </template>

<script>

import firebaseApp from '@/firebase.js';
import{ collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, addDoc, getDoc } from "firebase/firestore";
import {useToast} from 'vue-toast-notification';
// import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { useRoute } from "vue-router";

const db = getFirestore(firebaseApp);

export default {
  // components: {
  //   Datepicker
  // },
  props: {
    title: {
      type: String,
      default: "Card Title",
    },
  },
  data() {
    return {
      // dateFormat: 'yyyy-MM-dd',
      // PropertyId: "",
      tenant_email: "",
      rental: "",
      first_pay_date: "",
      num_payment_months: ""
    };
  },
  mounted() {
    this.$toast = useToast();
    // this.$toast.open('Component mounted!');
    // this.$toast.error('Error')
    console.log(this.$toast);
    // Vue.use(ToastPlugin);

    // Get Authentication
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
    // New part for router
    const route = useRoute();
    this.PropertyId = route.params.PropertyId;
    console.log("PropertyID is : " + this.PropertyId);
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      return emailRegex.test(email);
    },
    saveCard() {
      if (this.validateEmail(this.tenant_email)) {
        // email is valid, do something
        // const contract = addDoc(collection(db, "Contract"), {
        //   tenant_email: this.tenant_email,
        //   rental: this.rental,
        //   first_pay_date: this.first_pay_date,
        //   num_payment_months: this.num_payment_months,
        // });
        // Print contract ID
        // console.log(contract.id);
        
        // Console Testing to see if PropertyId and OwnerEmail passes through
        console.log("From saveCard() -> PropertyID is : " + this.PropertyId)
        console.log("From saveCard() -> OwnerEmail is : " + this.useremail)

      } else if (this.tenant_email == "" || this.rental == "" || this.first_pay_date == "" || this.num_payment_months == "") {
          this.$toast.error('Unfilled Fields!');
      } else {
        console.log("fail")
        // email is not valid, show error message
        this.$toast.error('Invalid email address');
      }
    },
  },
};
</script>
<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.card figure {
  float: left;
  margin-right: 1rem;
  width: 60%;
  height: 60%;
  object-fit: cover;
}

.card figure figcaption {
  margin-bottom: 20px;
  font-size: 1.8rem;
}

img {
  width: 100%;
  height: 100%;
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
  display: flex; /*Add this to use flexbox layout*/
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}
</style>