<template>
  <div>
    <h2 id="Contracts">Active Contracts</h2>
    <table id="table">
      <colgroup>
        <col span="1" style="width: 30%" />
        <col span="1" style="width: 20%" />
        <col span="1" style="width: 15%" />
        <col span="1" style="width: 20%" />
        <col span="1" style="width: 10%" />
      </colgroup>
      <tr>
        <th>Address</th>
        <th>Tenant Name</th>
        <th>Tenant Email</th>
        <th>Contact Details</th>
        <th>Action</th>
      </tr>
      <tr v-for="row in tableRows" :key="row.prop_address">
        <td v-if="row.owner_email === useremail && row.isRented">{{ row.prop_address }}</td>
        <td v-if="row.owner_email === useremail && row.isRented">{{ row.tenant_name }}</td>
        <td v-if="row.owner_email === useremail && row.isRented">{{ row.tenant_email }}</td>
        <td v-if="row.owner_email === useremail && row.isRented">{{ row.tenant_phone }}</td>
        <td v-if="row.owner_email === useremail && row.isRented">
          <div id="flexbutt">
            <RouterLink to="/indivcontract"
              ><button class="button2">View</button></RouterLink
            >
            <button class="button2">Delete</button>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <!-- Add new div for temporary button linking to IndivContractView.vue -->
  <br />
  <div class="flexcontainer">
    <RouterLink to="/indivcontract">
      <button class="button button2">View Indiv Active Contract</button>
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
    this.useremail = auth.currentUser.email;
    await this.fetchAndUpdateData(this.useremail);
  },

  methods: {
    async fetchAndUpdateData(useremail) {
      // Collect data from relevant Collections
      const colRef = collection(db, "Contract");
      const allDocuments = await getDocs(colRef);

      // Promise.all to ensure all async operations are over.
      // to iterate over all documents and create arrays of promises
      this.tableRows = await Promise.all(
        allDocuments.docs.map(async (documents) => {
          let documentData = documents.data();
          let owner_email = documentData.owner_email;

          // Accessing Property details
          const propRef = doc(db, "Property", documentData.PropertyID);
          const propDetails = await getDoc(propRef);
          let prop_address = propDetails.data().prop_address;
          let isRented = propDetails.data().isRented;

          // Accessing Tenant details
          let tenant_email = documentData.tenant_email;
          const tenantRef = doc(db, "Tenant", tenant_email);
          const tenantDetails = await getDoc(tenantRef);
          let tenant_name = tenantDetails.data().Name;
          let tenant_phone = tenantDetails.data().Phone;

          return {
            isRented,
            owner_email,
            prop_address,
            tenant_name,
            tenant_email,
            tenant_phone,
          };
        })
      );
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
}

table {
  border-radius: 15px;
  border: solid var(--color-border);
  width: 100%;
  background-color: var(--color-background);
}

th {
  font-weight: bold;
}

th,
td {
  border-bottom: solid var(--color-border);
  text-align: left;
  padding: 2px 50px 2px 50px;
  line-height: 50px;
}

/* Not sure if really required here */
.flexcontainer {
  display: flex;
  justify-content: flex-start;
  gap: 4em;
}

.button2 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  font-size: 0.8rem;
}

#flexbutt {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
}
</style>
