<template>
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
  
      <div id="PayStatus" class="card3">
        <span class="field">Payment Status</span> <br />
        <!-- This next tag will later be filled in using innerHTML -->
        <span id="inputPayStatus" class="info">{{ paymentStatus }}</span>
      </div>
  
      <div id="PayAmt" class="card3">
        <span class="field">Next Payment Amount</span> <br />
        <!-- This next tag will later be filled in using innerHTML -->
        <span id="inputPayAmt" class="info">{{ nextPaymentAmount }}</span>
      </div>
  
      <div id="PayDate" class="card3">
        <span class="field">Next Payment Due Date</span> <br />
        <!-- This next tag will later be filled in using innerHTML -->
        <span id="inputPayDate" class="info">{{ nextPaymentDueDate }}</span>
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
      
      <button id="Action" 
        v-bind:class="{
          unpaid: isUnpaid,
          overdue: isOverdue,
          pending: isPending,
          paid: isPaid,
        }"
        v-on:click="toggleState"
        
      >
        {{ computedButtonText }}
      </button>   
    </div>
  </template>
  
  <script>
  import firebaseApp from "@/firebase.js";
  import { getFirestore } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { doc, getDoc, getDocs, addDoc } from "firebase/firestore";
  import { query, where, collection } from "firebase/firestore";
  
  const db = getFirestore(firebaseApp);
  
  export default {
    data() {
      return {
        ContractId: "",
        PaymentId: "",
        PropertyId: "",
        PropAddress: "",
        paymentStatus: "",
        nextPaymentAmount: "",
        nextPaymentDueDate: "",
        prevPaymentDueDate: "",
        contractEndDate: "",
        tenantName: "",
        tenantEmail: "",
        tenantPhone: "",
        buttonTexts: {
          Unpaid: "Click to Pay Rent",
          Overdue: "Click to Pay Overdue Rent",
          Pending: "Payment is Pending Approval",
          Paid: "Payment Made Successfully"
        },
      };
    },

    computed: {
      isUnpaid() {
        return this.paymentStatus === "Unpaid";
      },
      isOverdue() {
        return this.paymentStatus === "Overdue";
      },
      isPending() {
        return this.paymentStatus === "Pending";
      },
      isPaid() {
        return this.paymentStatus === "Paid";
      },
      computedButtonText() {
        return this.buttonTexts[this.paymentStatus];
      },
    },
  
    async mounted() {
      const auth = getAuth();
      this.useremail = auth.currentUser.email
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          this.useremail = user.email;
        } else {
          // User is signed out
        }
      });
      // New part for router
      console.log(this.useremail);
      await this.getContractIdfromTenantEmail(this.useremail);
      console.log(this.ContractId);
      await this.fetchAndUpdateData(this.useremail, this.ContractId);
    },
  
    methods: {
      async getContractIdfromTenantEmail(useremail) {
        const collectionRef = collection(db, 'Contract');
        const emailQuery = query(collectionRef, where('TenantEmail', '==', useremail));

        try {
            const querySnapshot = await getDocs(emailQuery);
            querySnapshot.forEach((doc) => {
            console.log('Document ID:', doc.id);
            this.ContractId = doc.id
            });
        } catch (error) {
            console.log('Error getting documents:', error);
        }
      },
      async fetchAndUpdateData(useremail, ContractId) {
        // Get the Contract details using ContractId
        const contractDocRef = doc(db, "Contract", ContractId);
        const contractDoc = await getDoc(contractDocRef);
        const contractData = contractDoc.data();
        this.tenantEmail = contractData.TenantEmail;
        this.PaymentId = contractData.PaymentId;
        this.PropertyId = contractData.PropertyId;
        this.nextPaymentAmount = contractData.RentalCost;
        this.contractEndDate = contractData.EndDate.toDate().toLocaleDateString();
  
        // Comparison of current date
        console.log(new Date().toLocaleString());
        console.log(this.contractEndDate >= new Date().toLocaleString());
  
        // Get the Property details using PropertyId
        const propertyDocRef = doc(db, "Property", this.PropertyId);
        const propertyDoc = await getDoc(propertyDocRef);
        const propertyData = propertyDoc.data();
        this.PropAddress = propertyData.PropAddress;
  
        // Get Tenant Details using TenantEmail
        const tenantDocRef = doc(db, "Tenant", this.tenantEmail);
        const tenantDoc = await getDoc(tenantDocRef);
        const tenantData = tenantDoc.data();
        this.tenantName = tenantData.Name;
        this.tenantPhone = tenantData.Phone;
  
        // Get Payment Details using TenantEmail
        const paymentDocRef = doc(db, "Payment", this.PaymentId);
        const paymentDoc = await getDoc(paymentDocRef);
        const paymentData = paymentDoc.data();
        this.paymentStatus = paymentData.Status;
        this.nextPaymentDueDate =
          paymentData.NextDueDate.toDate().toLocaleDateString();
        this.prevPaymentDueDate =
          paymentData.PrevDueDate.toDate().toLocaleDateString();
      },
      
      toggleState() {
        // Allows tenant to navigate to PayRent.vue only if payment is Unpaid or Overdue
        switch (this.paymentStatus) {
          case "Unpaid":
            this.$router.push("/payrent/" + this.PaymentId);
            break;
          case "Overdue":
            this.$router.push("/payrent/" + this.PaymentId);
            break;
            // Do nothing if Payment Status is Paid or Pending
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    display: grid;
    grid-gap: 20px;
    grid-template:
      "a f f f f f f"
      "a b b c c d d"
      "a e e e e e e"
      "a e e e e e e"
      "a g g g g g g";
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
  
  #PayStatus {
    grid-area: f;
  }
  #Action {
    grid-area: g;
  }
  
  .card3 {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    background-color: var(--color-background);
    padding: 15px 0px 15px 0px;
    width: auto;
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
  
  .unpaid {
    padding: 10px 15px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    cursor: pointer;
    border: 2px solid var(--color-border);
    background-color: blue;
    color: white;
  }
 .paid {
    padding: 10px 15px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    cursor: pointer;
    border: 2px solid var(--color-border);
    background-color: green;
    color: white;
  }

  .pending {
    padding: 10px 15px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    cursor: pointer;
    border: 2px solid var(--color-border);
    background-color: orange;
    color: white;
  }
  .overdue {
    padding: 10px 15px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    cursor: pointer;
    border: 2px solid var(--color-border);
    background-color: red;
    color: white;
  }
  </style>
  