<template>
    <div>
        <h1> View Contract Details</h1>
    </div> <br>
    <div class="card">
        <div id="Prop" class="card3">
            <img id="img1" src="src/components/Property/AddPropImg.jpeg" alt="Card Image">
            <span class="field">Address</span> <br>
            <span id="inputAddress">Blk 123 blablabla</span>
        </div>

        <div id="PayAmt" class="card3">
            <span class="field">Next Payment Amount</span> <br>
            <!-- This next tag will later be filled in using innerHTML -->
            <span id="inputPayAmt" class="info">PaymentAmount</span>
        </div>

        <div id="PayDate" class="card3">
            <span class="field">Next Payment Date</span> <br>
            <!-- This next tag will later be filled in using innerHTML -->
            <span id="inputPayDate" class="info">PaymentDate</span>
        </div>

        <div id="ContractEndDate" class="card3">
            <span class="field">Contract End Date</span> <br>
            <!-- This next tag will later be filled in using innerHTML -->
            <span id="inputContractEndDate" class="info">ContractEndDate</span>
        </div>

        <div id="Tenant" class="card3">
            <span class="field">Tenant Information</span> <br>
            <!-- This next tags will later be filled in using innerHTML -->
            <span id="tenantName" class="info">Name</span> <br>
            <span id="tenantEmail" class="field">Email</span> <br>
            <span id="tenantPhone" class="field">Phone</span>
        </div>
    </div>
</template>

<script>
// import firebaseApp from '@/firebase.js';
// import{ getFirestore } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";

// const db = getFirestore(firebaseApp);
// // For now: Need to retrieve a specific data value then use it 
// // to get data from other collections
// // In future, Probably need to get data from parent component (ActiveContracts.vue)
// // 
// 
// export default {
//     mounted() {
//         async function display() {
//             // Get Payment Data

//             // Get Contract Data

//             // Get Property Data

//             // Get Tenant Data

//             // Input data into HTML
//             document.getElementById("inputAddress").innerHTML = propertyData.Address;
//             document.getElementById("inputPayAmt").innerHTML = contractData.RentalCost;
//             document.getElementById("inputPayDate").innerHTML = paymentData.Date.toDate().toLocaleDateString();
//             document.getElementById("inputContractEndDate").innerHTML = contractData.EndDate;
//             document.getElementById("tenantName").innerHTML = tenantData.Name;
//             document.getElementById("tenantEmail").innerHTML = tenantData.Email; 
//             document.getElementById("tenantPhone").innerHTML = tenantData.Phone;
//         }
//         display();
//     }
// }
</script>


<style scoped>
.card {
    display: grid;
    grid-gap: 20px;
    grid-template: 
    "a b b c c d d"
    "a e e e e e e"
    "a e e e e e e";
}

#Prop {
    grid-area: a;
    width: 300px
}

#PayAmt {
    grid-area: b;
}

#PayDate {
    grid-area: c;
}

#ContractEndDate {
    grid-area: d;
}

#Tenant {
    grid-area: e;
}

.card3 {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    background-color: var(--color-background);
    padding: 15px 0px 15px 0px;
}

#img1 {
    width:100%;
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
</style>