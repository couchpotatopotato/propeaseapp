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
      <tr v-for="row in tableRows" :key="row.PropAddress">
        <td v-if="row.OwnerEmail === useremail">
          {{ row.PropAddress }}
        </td>
        <td v-if="row.OwnerEmail === useremail">
          {{ row.TenantName }}
        </td>
        <td v-if="row.OwnerEmail === useremail">
          {{ row.TenantEmail }}
        </td>
        <td v-if="row.OwnerEmail === useremail">
          {{ row.TenantPhone }}
        </td>
        <td v-if="row.OwnerEmail === useremail">
          <div id="flexbutt">
            <RouterLink :to="'indivcontract/' + row.ContractId">
              <button class="button button2">View</button>
            </RouterLink>
          </div>
        </td>
      </tr>
    </table>
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
      ContractId: "",
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
      const allContracts = await getDocs(colRef);

      // Promise.all to ensure all async operations are over.
      // to iterate over all documents and create arrays of promises
      this.tableRows = await Promise.all(
        allContracts.docs.map(async (documents) => {
          let ContractId = documents.id;
          let propertyData = documents.data();
          let OwnerEmail = propertyData.OwnerEmail;

          // Accessing Property details
          const propRef = doc(db, "Property", propertyData.PropertyId);
          const propDetails = await getDoc(propRef);
          let PropAddress = propDetails.data().PropAddress;
          let IsRented = propDetails.data().IsRented;

          // Accessing Tenant details
          let TenantEmail = propertyData.TenantEmail;
          const tenantRef = doc(db, "Tenant", TenantEmail);
          const tenantDetails = await getDoc(tenantRef);
          let TenantName = tenantDetails.data().Name;
          let TenantPhone = tenantDetails.data().Phone;

          return {
            IsRented,
            OwnerEmail,
            PropAddress,
            TenantName,
            TenantEmail,
            TenantPhone,
            ContractId,
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
