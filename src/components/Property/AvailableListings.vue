<template>
  <div>
    <h2>Available Listings</h2>
    <table>
      <colgroup>
        <col span="1" style="width: 30%" />
        <col span="1" style="width: 40%" />
        <col span="1" style="width: 30%" />
      </colgroup>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
      <!-- only render the td when the email matches the current user -->
      <tr v-for="row in tableRows" :key="row.OwnerEmail">
        <td v-if="row.OwnerEmail === useremail && !row.IsRented">
          {{ row.PropName }}
        </td>
        <td v-if="row.OwnerEmail === useremail && !row.IsRented">
          {{ row.PropAddress }}
        </td>
        <td v-if="row.OwnerEmail === useremail && !row.IsRented">
          <div id="flexbutt">
            <RouterLink :to="'addtenant/' + row.PropertyId">
              <button class="button button2">AddContract</button>
            </RouterLink>
            <button
              class="button button2"
              @click="deleteProperty(row.PropertyId)"
            >
              Delete
            </button>
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
  doc,
  deleteDoc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      tableRows: [],
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
      // Collect data from relevant Collections
      const colRef = collection(db, "Property");
      const allProperty = await getDocs(colRef);

      // Promise.all to ensure all async operations are over.
      // to iterate over all documents and create arrays of promises
      this.tableRows = await Promise.all(
        allProperty.docs.map(async (doc) => {
          let propertyData = doc.data();
          let IsRented = propertyData.IsRented;
          let OwnerEmail = propertyData.OwnerEmail;
          let PropAddress = propertyData.PropAddress;
          let PropName = propertyData.PropName;
          let PropertyId = doc.id;

          return {
            IsRented,
            OwnerEmail,
            PropAddress,
            PropName,
            PropertyId,
          };
        })
      );
    },

    async deleteProperty(PropertyId) {
      alert("You are going to delete this property!");
      await deleteDoc(doc(db, "Property", PropertyId));
      console.log(
        "Deleted Document successfully, PropertyId is : " + PropertyId
      );
      // ONLY PROBLEM NOW IS THAT IT DOESN'T REFRESH
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
