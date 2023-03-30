<template>
    <div class="card">
      <figure>
        <img src="src/components/Property/AddPropImg.jpeg" alt="Image description">
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
        <label for="last_pay_date">Last Payment Date:</label>
        <input type="text" id="input4" v-model="last_pay_date" />
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
  
  <script>
  
  import firebaseApp from '@/firebase.js';
  import{ collection, getFirestore } from "firebase/firestore";
  import { doc, addDoc } from "firebase/firestore";
  import {useToast} from 'vue-toast-notification';
  // import VueToast from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-bootstrap.css';
  
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
        tenant_email: "",
        rental: "",
        first_pay_date: "",
        last_pay_date: ""
      };
    },
    mounted() {
      this.$toast = useToast();
      // this.$toast.open('Component mounted!');
      // this.$toast.error('Error')
      console.log(this.$toast);
      // Vue.use(ToastPlugin);
    },
    methods: {
      validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return emailRegex.test(email);
      },
      saveCard() {
        if (this.validateEmail(this.tenant_email)) {
          // email is valid, do something
          const card = addDoc(collection(db, "Property"), {
            tenant_email: this.tenant_email,
            rental: this.rental,
            first_pay_date: this.first_pay_date,
            last_pay_date: this.last_pay_date,
          });
          console.log(card.id);
        // } else if (this.$toast) {
        //   this.$toast.error('Invalid email address');
        } else if (this.tenant_email == "" || this.rental == "" || this.first_pay_date == "" || this.last_pay_date == "") {
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
  