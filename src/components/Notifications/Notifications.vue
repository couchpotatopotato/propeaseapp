<template>
  <table id="table">
    <colgroup>
      <col span="1" style="width: 40%" />
      <col span="1" style="width: 15%" />
      <col span="1" style="width: 40%" />
      <col span="1" style="width: 15%" />
    </colgroup>
    <tr>
      <th>Address</th>
      <th>Tenant</th>
      <th>Message</th>
      <th>Actions</th>
    </tr>

    <tr v-for="row in tableRows" :key="row.propAddress">
      <td v-if="row.ownerEmail === useremail">{{ row.propAddress }}</td>
      <td v-if="row.ownerEmail === useremail">{{ row.tenantName }}</td>
      <td v-if="row.ownerEmail === useremail">{{ row.message }}</td>
      <td v-if="row.ownerEmail === useremail">
        <div id="flexbutt">
          <RouterLink to="/indivcontract">
            <button class="button2">View</button>
          </RouterLink>
          <button id="clear" class="button2">Clear</button>
        </div>
      </td>
    </tr>

  </table>
  <br /><br />

  <div class="flexcontainer">
    <RouterLink to="/approvepayment">
      <button class="button button2">Approve Payment</button>
    </RouterLink>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      tableRows: [],
      useremail: "",
    };
  },

  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser; // owner email
    await this.fetchAndUpdateData(this.useremail);
  },

  methods: {
    async fetchAndUpdateData(useremail) {
      // Collect data from relevant Collections
      const colRef = collection(db, "Notification");
      const allDocuments = await getDocs(colRef);

      // Promise.all to ensure all async operations are over.
      // to iterate over all documents and create arrays of promises
      this.tableRows = await Promise.all(
        allDocuments.docs.map(async (documents) => {
          let documentData = documents.data();
          console.log(documentData);
          let contractId = documentData.ContractId;
          let ownerEmail = documentData.OwnerEmail;
          let tenantEmail = documentData.TenantEmail;
          let message = documentData.Message;

          // Accessing Contract details
          const contractRef = doc(db, "Contract", contractId);
          const contractDetails = await getDoc(contractRef);
          console.log(contractDetails.data());
          let propId = contractDetails.data().PropertyId;

          // Accessing Property details
          const propRef = doc(db, "Property", propId);
          const propDetails = await getDoc(propRef);
          console.log(propDetails.data());
          let propAddress = propDetails.data().PropAddress;

          // Accessing Tenant details
          const tenantRef = doc(db, "Tenant", tenantEmail);
          const tenantDetails = await getDoc(tenantRef);
          console.log(tenantDetails.data());
          let tenantName = tenantDetails.data().Name;

          console.log(useremail);

          return {
            ownerEmail,
            propAddress,
            tenantName,
            message,
          };
        })
      );
    },
  },
};
</script>

<style scoped>
table {
  border-radius: 15px;
  border-collapse: separate;
  border: solid var(--color-border);
  /* width: 120%; */
  background-color: var(--color-background);
}

th {
  border-bottom: solid var(--color-border);
  font-weight: bold;
}

td,th {
  text-align: left;
  padding: 2px 15px 2px 15px;
  line-height: 50px;
}
</style>
