<template>
  <div class="card">
    <figure>
      <img
        src="@/components/Property/AddPropImg.jpeg"
        alt="Image description"
      />
      <figcaption>{{ PropAddress }}</figcaption>
    </figure>
    <!-- <img src="src/components/Property/AddPropImg.jpeg" alt="Card Image" />
      <h5> Property Address </h5> -->
    <div class="form-group">
      <label for="tenant_email">Tenant Email:</label>
      <input type="text" id="input1" v-model="tenant_email" />
      <label for="rental">Monthly Rental Cost:</label>
      <input type="text" id="input2" v-model="rental" />
      <label for="first_pay_date">First Payment Date:</label>
      <input type="date" id="input3" v-model="first_pay_date" />
      <label for="last_pay_date">Number of Payment Months</label>
      <input type="number" id="input4" v-model="num_payment_months" />
      <RouterLink to="/property">
        <button type="add" @click="saveCard" class="button2">Add</button>
      </RouterLink>
    </div>
  </div>
  <RouterLink to="/property">
    <button type="back" class="button2">Back</button>
  </RouterLink>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { collection, getFirestore, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { useToast } from "vue-toast-notification";

// import VueToast from 'vue-toast-notification';
import "vue-toast-notification/dist/theme-bootstrap.css";
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
      useremail: "",
      tenant_email: "",
      rental: "",
      first_pay_date: "",
      num_payment_months: "",
      PropAddress: "",
    };
  },
  async mounted() {
    this.$toast = useToast();
    // this.$toast.open('Component mounted!');
    // this.$toast.error('Error')
    console.log(this.$toast);
    // Vue.use(ToastPlugin);

    // Get Authentication
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.useremail = user.email;
      } else {
        // User is signed out
      }
    });

    // New part for router
    const route = useRoute();
    this.PropertyId = route.params.PropertyId;
    console.log("PropertyID is : " + this.PropertyId);
    await this.getPropAddress(this.PropertyId);
    console.log("Property Address is : " + this.PropAddress);
  },

  methods: {
    async getPropAddress(PropertyId) {
      const propertyDocRef = doc(db, "Property", PropertyId);
      const propertyDoc = await getDoc(propertyDocRef);
      const propertyData = propertyDoc.data();
      this.PropAddress = propertyData.PropAddress;
    },
    validateEmail(email) {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      const tenantExists = true; // Need to modify based on whether email is present in database
      return emailRegex.test(email) && tenantExists;
    },
    async saveCard() {
      // if any field empty -> reject
      if (
        this.tenant_email == "" ||
        this.rental == "" ||
        this.first_pay_date == "" ||
        this.num_payment_months == ""
      ) {
        this.$toast.error("Unfilled Fields!");
      } else if (this.validateEmail(this.tenant_email)) {
        // else check if email is valid and present in database

        console.log(
          "This is the number of payment months: " + this.num_payment_months
        );

        // email is valid, Create new contract and create new payment
        const startDateObject = new Date(this.first_pay_date);
        // console.log("This is the startDateObject: " + startDateObject)
        const endDateObject = new Date(this.first_pay_date);
        // console.log("This is the endDateObject before modifying: " + endDateObject)
        // console.log("Month of endDateObject: "+ endDateObject.getMonth())
        // console.log("New Month of endDateObject: "+ endDateObject.getMonth() + this.num_payment_months)
        endDateObject.setMonth(
          endDateObject.getMonth() + this.num_payment_months
        );
        // console.log("This is the endDateObject after modifying: " + endDateObject)
        const startDateTimestamp = Timestamp.fromDate(startDateObject);
        const endDateTimestamp = Timestamp.fromMillis(endDateObject.getTime());

        const contractRef = await addDoc(collection(db, "Contract"), {
          TenantEmail: this.tenant_email,
          RentalCost: this.rental,
          StartDate: startDateTimestamp,
          EndDate: endDateTimestamp,
          OwnerEmail: this.useremail,
          PropertyId: this.PropertyId,
        });

        // Print contract ID
        console.log(
          "From saveCard() -> ContractID of new contract created is : " +
            contractRef.id
        );
        // Console Testing to see if PropertyId and OwnerEmail passes through
        console.log("From saveCard() -> PropertyID is : " + this.PropertyId);
        console.log("From saveCard() -> OwnerEmail is : " + this.useremail);

        // create appropriate payment docyment
        const paymentRef = await addDoc(collection(db, "Payment"), {
          ContractId: contractRef.id,
          TenantEmail: this.tenant_email,
          OwnerEmail: this.useremail,
          PaymentAmount: this.rental,
          Status: "Unpaid",
          NextDueDate: Timestamp.fromDate(new Date(this.first_pay_date)),
        });
        // Print contract ID
        console.log(
          "From saveCard() -> PaymentID of new contract created is : " +
            paymentRef.id
        );

        // Update the Contract with PaymentID
        await updateDoc(contractRef, {
          PaymentId: paymentRef.id,
        });

        // Set Property IsRented to true so now it doesn't display at AvailableListings, but instead at ActiveContracts
        const propertyRef = doc(db, "Property", this.PropertyId);
        await updateDoc(propertyRef, {
          IsRented: true,
        });
      } else {
        console.log("fail");
        // email is not valid, show error message
        this.$toast.error("Invalid email address");
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
  margin-bottom: 10px;
  font-size: 2.3rem;
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

input[type="text"],
input[type="date"],
input[type="number"] {
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
