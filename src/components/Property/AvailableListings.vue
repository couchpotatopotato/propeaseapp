<template>
  <div>
    <h2>Available Listings</h2>
    <br />
    <table>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Action</th>
      </tr>

      <!-- only render the td when the email matches the current user -->
      <tr v-for="row in tableRows" :key="row.owner_email">
        <td v-if="row.owner_email === useremail">{{ row.prop_name }}</td>
        <td v-if="row.owner_email === useremail">{{ row.prop_address }}</td>
        <td v-if="row.owner_email === useremail">
          <div id="flexbutt">
            <button class="button2">View</button>
            <button class="button2">Delete</button>
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
  padding: 2px 50px 2px 50px;
  line-height: 50px;
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
