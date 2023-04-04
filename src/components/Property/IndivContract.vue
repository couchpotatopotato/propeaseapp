<template>
  <!-- <div class = "about">
        <h1>View Contract Details</h1>
    </div> -->
  <br />
  <div class="card">
    <div id="Prop" class="card3">
      <img
        id="img1"
        src="@/components/Property/AddPropImg.jpeg"
        alt="Card Image"
      />
      <span class="field">Address</span> <br />
      <span id="inputAddress">{{ PropAddress }}</span>
    </div>

    <div id="PayAmt" class="card3">
      <span class="field">Next Payment Amount</span> <br />
      <!-- This next tag will later be filled in using innerHTML -->
      <span id="inputPayAmt" class="info">{{ nextPaymentAmount }}</span>
    </div>

    <div id="PayDate" class="card3">
      <span class="field">Next Payment Date</span> <br />
      <!-- This next tag will later be filled in using innerHTML -->
      <span id="inputPayDate" class="info">{{ nextPaymentDate }}</span>
    </div>

    <div id="ContractEndDate" class="card3">
      <span class="field">Contract End Date</span> <br />
      <!-- This next tag will later be filled in using innerHTML -->
      <span id="inputContractEndDate" class="info">{{ contractEndDate }}</span>
    </div>

    <div id="Tenant" class="card3">
      <span class="field">Tenant Information</span> <br />
      <!-- This next tags will later be filled in using innerHTML -->
      <span id="tenantName" class="info">{{ tenantName }}</span> <br />
      <span id="tenantEmail" class="field">{{ tenantEmail }}</span> <br />
      <span id="tenantPhone" class="field">{{ tenantPhone }}</span>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { query, where, collection } from "firebase/firestore";
import { useRoute } from "vue-router";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      PropAddress: "",
      nextPaymentAmount: "",
      nextPaymentDate: "",
      contractEndDate: "",
      tenantName: "",
      tenantEmail: "",
      tenantPhone: "",
    };
  },

  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
    // In future, Probably need to get data from
    // For now, set tempPropertyID as a constant, but you should replace this
    // with a variable that holds the property ID obtained from the previous page
    // - component (ActiveContracts.vue) from PropertyView
    const route = useRoute();
    const ContractId = route.params.ContractId;
    // const ContractId = "O6LZIsxeNBl5ajNf45QV";
    await this.fetchAndUpdateData(this.useremail, ContractId);
  },

  methods: {
    /* Parse in parameters: Property Owner's Email, propertyID to get:
    - From Property Collection: property_address
    - From Contract Collection:
        - Contract.RentalCost (nextPaymentAmount)
        - Contract.EndDate (contractEndDate)
        - Contract.tenant_email (tenantEmail) ---> (Document PK/ID of each Tenant document) -> use to get tenant info
        - Contract.contractID (Document PK/ID of each Contract) use this to get due date
    - Use contractID to get Payment.dueDate (nextPaymentDate)
    - Use tenantEmail to get
        - Tenant.tenant_name: tenantName
        - Tenant.tenant_phone: tenantPhone
    */

    async fetchAndUpdateData(useremail, ContractId) {
      // Get the Contract details using ContractId
      const contractDocRef = doc(db, "Contract", ContractId);
      const contractDoc = await getDoc(contractDocRef);
      const contractData = contractDoc.data();
      this.tenantEmail = contractData.tenantEmail;
      const PropertyId = contractData.PropertyId;
      this.nextPaymentAmount = contractData.RentalCost;
      this.contractEndDate = contractData.EndDate.toDate().toLocaleDateString();

      // Get the Property details using PropertyId
      const propertyDocRef = doc(db, "Property", PropertyId);
      const propertyDoc = await getDoc(propertyDocRef);
      const propertyData = propertyDoc.data();
      this.PropAddress = propertyData.PropAddress;

      //   // Get the payment due date using the contract ID
      //   const paymentQuery = query(
      //     collection(db, "Payment"),
      //     where("ContractId", "==", ContractID)
      //   );
      //   const paymentQuerySnapshot = await getDocs(paymentQuery);

      //   // const paymentQuerySnapshot = await db.collection('Payment').where('ContractID', '==', contractID).get();
      //   if (paymentQuerySnapshot.empty) {
      //     console.log("No matching Payment documents.");
      //     return;
      //   }

      //   // Get the first matching payment document
      //   const paymentDoc = paymentQuerySnapshot.docs[0];
      //   this.nextPaymentDate = paymentDoc
      //     .data()
      //     .dueDate.toDate()
      //     .toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.card {
  display: grid;
  grid-gap: 20px;
  grid-template:
    "a b b c c d d"
    "a e e e e e e"
    "a e e e e e e";
}

#Prop {
  grid-area: a;
  width: 300px;
}

#PayAmt {
  grid-area: b;
}

#PayDate {
  grid-area: c;
}

#ContractEndDate {
  grid-area: d;
}

#Tenant {
  grid-area: e;
}

.card3 {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  background-color: var(--color-background);
  padding: 15px 0px 15px 0px;
}

#img1 {
  width: 100%;
  margin: 0px;
}

span {
  padding: 15px;
  font-size: 18px;
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
