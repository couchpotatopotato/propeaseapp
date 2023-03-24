<template>
    <div>
        <h2 id = "Contracts">Active Contracts</h2>
        <table id = "table">
            <colgroup>
                <col span="1" style="width: 30%;">
                <col span="1" style="width: 20%;">
                <col span="1" style="width: 20%;">
                <col span="1" style="width: 15%;">
                <col span="1" style="width: 10%;">
            </colgroup>
            <tr>
                <th>Address</th>
                <th>Tenant Name</th>
                <th>Tenant Email</th>
                <th>Contact Details</th>
                <th>Action</th>
            </tr>
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
    width: 120%;
    background-color: var(--color-background);
}

th {
    border-bottom: solid var(--color-border);
    font-weight: bold;
}

td, th {
    text-align: left;
    padding: 2px 15px 2px 15px; 
    line-height: 50px;
}
</style>

<script>
// import firebaseApp from '../firebase.js';
// import { getFirestore } from "firebase/firestore"
// import {collection, getDocs, doc, deleteDoc} from "firebase/firestore"

// const db = getFirestore(firebaseApp);

// export default {
//     mounted() {
//         async function display() {
//             let allDocuments = await getDocs(collection(db, "Contract")) // Change depending on how the firestore db is structured

//         }
//     }
// }


</script>
