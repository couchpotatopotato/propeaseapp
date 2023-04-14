<template>
  <div class="card">
    <div id="Prop" class="card3">
      <img
        id="img1"
        src="@/components/Property/AddPropImg.jpeg"
        alt="Card Image"
      />
      <span id="inputAddress">{{ Address }}</span>
    </div>

    <div id="PayAmt" class="card2">
      <span class="field">Payment Amount</span> <br />
      <span id="inputPayAmt" class="info">{{ PaymentAmount }}</span>
    </div>

    <div id="PayDate" class="card2">
      <span class="field">Payment Date</span> <br />
      <span id="inputPayDate" class="info">{{ PaymentDate }}</span>
    </div>

    <div id="PayMode" class="card2">
      <span class="field">Payment Mode</span> <br />
      <span id="inputPayMode" class="info">{{ PaymentMode }}</span>
    </div>

    <div id="Tenant" class="card3">
      <span class="field">Tenant</span> <br />
      <span id="tenantName" class="info">{{ TenantName }}</span> <br />
      <span id="tenantEmail" class="field">{{ TenantEmail }}</span> <br />
      <span id="tenantPhone" class="field">{{ TenantPhone }}</span>
    </div>

    <div id="Approve">
      <button id="approvebtn" class="button button2" v-on:click="approve">
        Approve
      </button>
    </div>

    <div id="Reject">
      <button id="rejectbtn" class="button" v-on:click="reject">Reject</button>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, updateDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRoute } from "vue-router";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      Address: "",
      PaymentAmount: "",
      PaymentDate: "",
      PaymentMode: "",
      TenantName: "",
      TenantEmail: "",
      TenantPhone: "",
      ContractId: "",
      useremail: "",
      PaymentId: ""
    };
  },

  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser; // owner email
    // New part for router
    const route = useRoute();
    this.PaymentId = route.params.PaymentId;
    await this.fetchAndUpdateData(this.PaymentId);
  },

  methods: {
    async fetchAndUpdateData(paymentId) {
      // get payment data
      let paymentRef = doc(db, "Payment", paymentId);
      let paymentSnap = await getDoc(paymentRef);
      if (paymentSnap.exists()) {
        console.log("Payment Document data:", paymentSnap.data());
      } else {
        // paymentSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let paymentData = paymentSnap.data();

      // get contract data
      this.ContractId = paymentData.ContractId;
      console.log("contractId:", this.ContractId);
      let contractRef = doc(db, "Contract", this.ContractId);
      let contractSnap = await getDoc(contractRef);
      if (contractSnap.exists()) {
        console.log("Contract Document data:", contractSnap.data());
      } else {
        // contractSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let contractData = contractSnap.data();

      // get property data
      let propertyId = contractData.PropertyId;
      let propertyRef = doc(db, "Property", propertyId);
      let propertySnap = await getDoc(propertyRef);
      if (propertySnap.exists()) {
        console.log("Property Document data:", propertySnap.data());
      } else {
        // propertySnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let propertyData = propertySnap.data();

      // get tenant data
      let tenantEmail = contractData.TenantEmail; // tenantEmail used as ID
      console.log(tenantEmail);
      let tenantRef = doc(db, "Tenant", tenantEmail);
      let tenantSnap = await getDoc(tenantRef);
      if (tenantSnap.exists()) {
        console.log("Tenant Document data:", tenantSnap.data());
      } else {
        // tenantSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let tenantData = tenantSnap.data();

      //
      this.Address = propertyData.PropAddress;
      this.PaymentAmount = "$" + contractData.RentalCost;
      this.PaymentDate = paymentData.PaymentDate.toDate().toLocaleDateString();
      this.PaymentMode = paymentData.Mode;
      this.TenantName = tenantData.Name;
      this.TenantEmail = tenantEmail;
      this.TenantPhone = tenantData.Phone;
      this.OwnerEmail = contractData.OwnerEmail;
    },

    async approve() {
      // to update payment status to "Paid"
      alert("Approving Payment Claim");
      try {
        const paymentDocRef = doc(db, "Payment", this.PaymentId);
        const paymentSnap = await getDoc(paymentDocRef);
        const currNextDue = paymentSnap.data().NextDueDate;
        const currNextDueMillis = currNextDue.toDate();
        const currNextDueDatetype = new Date(currNextDueMillis);
        console.log(currNextDueDatetype)
        const newNextDueMillis = new Date(currNextDueMillis);
        newNextDueMillis.setMonth(newNextDueMillis.getMonth() + 1);
        const newNextDueDatetype = new Date(newNextDueMillis);
        console.log(newNextDueDatetype)
        const newNextDue = Timestamp.fromMillis(newNextDueDatetype);
        
        const currDate = new Date();
        console.log("Current Date: ", currDate);
        let newStatus = paymentSnap.data().Status;
        if (currDate <= currNextDueDatetype) {
          console.log(currDate, '<=', currNextDueDatetype);
          console.log("new status = paid");
          newStatus = "Paid";
        } else if (currDate <= newNextDueDatetype) {
          console.log(currDate, '<=', newNextDueDatetype);
          console.log("new status = unpaid");
          newStatus = "Unpaid";
        } else {
          newStatus = "Overdue";
        }
        console.log(paymentSnap.data());

        // update pay doc
        await updateDoc(paymentDocRef, {
          Status: newStatus,
          PaymentDate: Timestamp.fromDate(new Date(this.PaymentDate)),
          PrevDueDate: currNextDue,
          NextDueDate: newNextDue,
        });
        this.$emit("approved");

        // add payment to pay history
        console.log("updating pay history")
        addDoc(collection(db, "PaymentHistory"), {
          ContractId: this.ContractId,
          Mode: this.PaymentMode,
          OwnerEmail: this.OwnerEmail,
          PaymentAmount: this.PaymentAmount,
          PaymentDate: Timestamp.fromDate(new Date(this.PaymentDate)),
          TenantEmail: this.TenantEmail, 
        });
        console.log("payment history updated")

        // add notif for approve
        console.log("sending approve notif")
        addDoc(collection(db, "Notification"), {
          ContractId: this.ContractId,
          Date: new Date().toLocaleDateString(),
          Message:
            "Owner: Your payment claim of " +
            this.PaymentAmount +
            " on " +
            this.PaymentDate +
            " has been approved.",
          OwnerEmail: this.OwnerEmail,
          TenantEmail: this.TenantEmail,
          Receiver: "Tenant",
        });
        console.log("approve notif sent")
        this.$router.push("/indivcontract/" + this.ContractId);

      } catch (error) {
        console.error("Error executing approval", error);
      }
    },

    async reject() {
      alert("Rejecting Payment Claim");
      try {
        // to update payment status to "Paid"
        const paymentDocRef = doc(db, "Payment", this.PaymentId);
        const paymentSnap = await getDoc(paymentDocRef);
        const paymentData = paymentSnap.data();
        const dueDateMillis = paymentData.NextDueDate.toDate();
        const dueDatetype = new Date(dueDateMillis);

        const currDate = new Date();
        console.log("Current Date: ", currDate);
        let newStatus = paymentData.Status;
        if (currDate <= dueDatetype) {
          newStatus = "Unpaid";
        } else {
          newStatus = "Overdue";
        }
        console.log(paymentData);

        await updateDoc(paymentDocRef, {
          Status: newStatus,
        });

        // to send notif to tenant that payment has been rejected
        console.log("sending reject notif")
        addDoc(collection(db, "Notification"), {
          ContractId: this.ContractId,
          Date: new Date().toLocaleDateString(),
          Message:
            "Owner: Your payment claim of " +
            this.PaymentAmount +
            " on " +
            this.PaymentDate +
            " has been rejected.",
          OwnerEmail: this.OwnerEmail,
          TenantEmail: this.TenantEmail,
          Receiver: "Tenant",
        });
        console.log("reject notif sent")
        this.$router.push("/indivcontract/" + this.ContractId);

        this.$emit("rejected");
      } catch (error) {
        console.error("Error executing rejection", error);
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
    "a b b c c d d"
    "a e e e e e e"
    "a f f f g g g";
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

#PayMode {
  grid-area: d;
}

#Tenant {
  grid-area: e;
}

#Approve {
  grid-area: f;
}

#Reject {
  grid-area: g;
}

.card3 {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  background-color: var(--color-background);
  padding: 15px 0px 15px 0px;
}

.card2 {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  background-color: var(--color-background);
  padding: 15px 0px 15px 0px;
  text-align: center;
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

.button2 {
  width: 100%;
}

#rejectbtn {
  color: white;
  background-color: #ff3333;
  width: 100%;
  border-radius: 5px;
  font-size: 1.2rem;
}
#rejectbtn:hover {
  background-color: rgb(255, 230, 230);
}
</style>
