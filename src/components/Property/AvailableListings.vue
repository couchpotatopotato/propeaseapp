<template>
    <div>
        <h2>Available Listings</h2>
        <colgroup>
            <col span="1" style="width: 80%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 15%;">
        </colgroup>
        <table>
            <tr>
                <th>Address</th>
                <th>View</th>
                <th>Delete</th>
            </tr>
            <!-- <tr v-for="(row, index) in tableRows" :key="row.prop_address"> -->
                <!-- <td>{{ index + 1 }}</td> Serial number
                <td>{{ row.prop_address }}</td> Property address -->
                <!-- <td>
                    <button @click="switchToAddContract(row.coin, useremail)" class="bwt">View</button>
                </td> -->
                <!-- <td>
                    <RouterLink to="/addcontract">
                        <button class="button button2">Add Contract</button>
                    </RouterLink>
                    <button @click="deleteInstrument(row.coin, useremail)" class="bwt">View</button>
                </td>
            </tr> -->
        </table>
    </div>
</template>

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

<script>

// import firebaseApp from '@/firebase.js';
// // import{ collection, getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore"
// import {collection, getDocs, doc, deleteDoc} from "firebase/firestore"

// const db = getFirestore(firebaseApp);

// export default {
//     // Data for Active Contract: PropertyAddress, TenantName, TenantEmail, TenantContact, 
//     // Action(View) isnt part of data
//     data() {
//       return {
//         prop_address: "",
//         tenant_name: "",
//         tenant_email: "",
//         tenant_contact: ""
//       }
//     },

//     async mounted() {
//       const auth = getAuth();
//       this.useremail = auth.currentUser.email;
//       await this.fetchAndUpdateData(this.useremail);
//     },

//     methods: {
//       async fetchAndUpdateData(useremail) {
//         // Collect data from relevant Collections
//         // allDocuments is all the documents in the collection titled witb the particular email account
//         let allPropertyDocs = await getDocs(collection(db, Property));

  
//         this.totalProfit = 0;
//         // Promise.all to ensure all async operations are over.
//         // allDocuments.docs.map(async (doc) to iterate over all documents and create arrays of promises
  
//         this.tableRows = await Promise.all(
//           allDocuments.docs.map(async (doc) => {
  
//             let documentData = doc.data();
  
//             let coin = documentData.Coin;
//             let ticker = documentData.Ticker;
//             let buyPrice = documentData.Buy_Price;
//             let buyQuantity = documentData.Buy_Quantity;
  
//             let currentPrice = await this.fetchCurrentPrice(ticker);
//             let profit = Math.round(buyQuantity * (parseFloat(currentPrice) - parseFloat(buyPrice)));
  
//             this.totalProfit += profit;
  
//             return {
//               coin,
//               ticker,
//               buyPrice,
//               buyQuantity,
//               currentPrice,
//               profit,
//             };
//           }),
//         );
//       },
  
//       async fetchCurrentPrice(ticker) {
//         let binance = new ccxt.binance();
//         let x = await binance.fetch_ohlcv(ticker, '5m');
//         return x[499][4];
//       },
  
//       async deleteInstrument(coin, user) {
//         alert("You are going to delete: " + coin);
//         await deleteDoc(doc(db, user, coin));
//         console.log("Document successfully deleted!", coin);
        
//         // Refresh table data and total profit
//         await this.fetchAndUpdateData(this.useremail);
//       },
//     }
// }

</script>
