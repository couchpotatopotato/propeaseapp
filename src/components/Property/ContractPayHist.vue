<template>
  <div>
    <table>
      <colgroup>
        <col span="1" style="width: 35%" />
        <col span="1" style="width: 35%" />
        <col span="1" style="width: 30%" />
      </colgroup>
      <tr>
        <th>Payment Date</th>
        <th>Payment Mode</th>
        <th>Payment Amount</th>
      </tr>
      <tr v-for="row in tableRows" :key="row.CurrContractId">
        <td v-if="row.ContractId === ContractId">{{ row.PaymentDate }}</td>
        <td v-if="row.ContractId === ContractId">{{ row.Mode }}</td>
        <td v-if="row.ContractId === ContractId">{{ row.PaymentAmount }}</td>
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
import { useRoute } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      tableRows: [],
      ContractId: "",
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

    // New part for router
    const route = useRoute();
    this.ContractId = route.params.ContractId;
    await this.fetchAndUpdateData();
  },

  methods: {
    async fetchAndUpdateData() {
      // Collect data from relevant Collections
      const colRef = collection(db, "PaymentHistory");
      const allDocuments = await getDocs(colRef);

      // Promise.all to ensure all async operations are over.
      // to iterate over all documents and create arrays of promises
      this.tableRows = await Promise.all(
        allDocuments.docs.map(async (doc) => {
          let documentData = doc.data();
          let ContractId = documentData.ContractId;
          let Mode = documentData.Mode;
          let PaymentAmount = documentData.PaymentAmount;
          let PaymentDate =
            documentData.PaymentDate.toDate().toLocaleDateString();

          return {
            ContractId,
            Mode,
            PaymentAmount,
            PaymentDate,
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
</style>
