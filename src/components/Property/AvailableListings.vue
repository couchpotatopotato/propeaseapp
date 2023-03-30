<template>
  <div>
    <h2>Available Listings</h2>
    <colgroup>
      <col span="1" style="width: 80%" />
      <col span="1" style="width: 15%" />
      <col span="1" style="width: 15%" />
    </colgroup>
    <table>
      <tr>
        <th>Address</th>
        <th>View</th>
        <th>Delete</th>
      </tr>
      <tr v-for="row in tableRows" :key="row.owner_email">
        <td>{{ row.prop_address }}</td>
        <td>{{ row.prop_name }}</td>
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

import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      tableRows: [],
    };
  },

  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
    console.log(this.useremail);
    await this.fetchAndUpdateData(this.useremail);
  },

  methods: {
    async fetchAndUpdateData(useremail) {
      // Collect data from relevant Collections
      const colRef = collection(db, "Property");
      const allDocuments = await getDocs(colRef);

      // Promise.all to ensure all async operations are over.
      // to iterate over all documents and create arrays of promises
      this.tableRows = await Promise.all(
        allDocuments.docs.map(async (doc) => {
          let documentData = doc.data();
          let isRented = documentData.isRented;
          let owner_email = documentData.owner_email;
          let prop_address = documentData.prop_address;
          let prop_name = documentData.prop_name;
          return {
            isRented,
            owner_email,
            prop_address,
            prop_name,
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
  border-bottom: solid var(--color-border);
  font-weight: bold;
}

td,
th {
  text-align: left;
  padding: 2px 15px 2px 15px;
  line-height: 50px;
}
</style>
