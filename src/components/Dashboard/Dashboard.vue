<template>
  <div id="dashboard">
    <div id="metric1" class="cardSmall">
      <span class="field">Current Overdue</span> <br />
      <span class="info">{{ CurrentOverdue }}</span>
    </div>

    <div id="metric2" class="cardSmall">
      <span class="field">Active Contracts</span> <br />
      <span class="info">{{ NumActiveContracts }}</span>
    </div>

    <div id="metric3" class="cardSmall">
      <span class="field">Total Properties</span> <br />
      <span class="info">{{ TotalProp }}</span>
    </div>

    <div id="metric4" class="cardSmall">
      <span class="field">Available Properties</span> <br />
      <span class="info">{{ AvailProp }}</span>
    </div>

    <div id="metric5" class="cardSmall">
      <span class="field">Total Revenue</span> <br />
      <span class="info">${{ TotalRevenue }}</span>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      CurrentOverdue: "",
      NumActiveContracts: "",
      TotalProp: "",
      AvailProp: "",
      TotalRevenue: "",
    };
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.useremail = user.email;
      } else {
        // User is signed out
      }
    });
    await this.fetchAndUpdateData(this.useremail);
  },

  methods: {
    async fetchAndUpdateData(useremail) {
      // Collect data from Property
      const propRef = collection(db, "Property");
      const propDetails = await getDocs(propRef);
      let totalProp = 0;
      propDetails.forEach((prop) => {
        if (prop.data().OwnerEmail === this.useremail) {
          totalProp += 1;
        }
      });
      console.log("total number of props obtained");

      // Collect data from Contract
      const contractRef = collection(db, "Contract");
      const contractDetails = await getDocs(contractRef);
      let activeContracts = 0;
      contractDetails.forEach((contract) => {
        if (contract.data().OwnerEmail === this.useremail) {
          activeContracts += 1;
        }
      });
      console.log("num active contracts obtained");

      // Collect data from Payment
      const paymentRef = collection(db, "Payment");
      const paymentDetails = await getDocs(paymentRef);
      let overdue = 0;
      paymentDetails.forEach((payment) => {
        if (
          payment.data().OwnerEmail === this.useremail &&
          payment.data().Status === "Overdue"
        ) {
          overdue += 1;
        }
      });
      console.log("num overdue obtained");

      // Collect data from PaymentHistory
      const payHistRef = collection(db, "PaymentHistory");
      const payHistDetails = await getDocs(payHistRef);
      let totalRevenue = 0;
      payHistDetails.forEach((doc) => {
        if (doc.data().OwnerEmail === this.useremail) {
          if (typeof doc.data().PaymentAmount === "string") {
            totalRevenue += parseInt(doc.data().PaymentAmount);
          } else {
            totalRevenue += doc.data().PaymentAmount;
          }
        }
      });
      console.log("total revenue obtained");

      this.CurrentOverdue = overdue;
      this.NumActiveContracts = activeContracts;
      this.TotalProp = totalProp;
      this.AvailProp = totalProp - activeContracts;
      this.TotalRevenue = totalRevenue;
    },
  },
};
</script>

<style scoped>
#dashboard {
  display: grid;
  grid-gap: 20px;
  grid-template:
    "a b"
    "c d"
    "e e";
  width: 60%;
  text-align: center;
}

#metric1 {
  grid-area: a;
}

#metric2 {
  grid-area: b;
}

#metric3 {
  grid-area: c;
}

#metric4 {
  grid-area: d;
}

#metric5 {
  grid-area: e;
}

.field {
  font-size: 12px;
}

.info {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-darkblue);
}
</style>
