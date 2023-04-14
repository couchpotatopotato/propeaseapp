<template>
    <div class="card">
        <div id="Prop" class="propcard">
            <img id="img1" src="@/components/Property/AddPropImg.jpeg" alt="Card Image">
            <span id="inputAddress">{{ Address }}</span>
        </div>

        <div id="PayAmt" class="card2">
            <span class="field">Payment Amount</span> <br>
            <span id="inputPayAmt" class="info">{{ PaymentAmount }}</span>
        </div>

        <div id="PayDate" class="card2">
            <span class="field">Payment Date</span> <br>
            <span id="inputPayDate" class="info">{{ PaymentDate }}</span>
        </div>

        <div id="PayMode">
            <span style="font-size:1.2rem; padding-left:0%;">Please Indicate Payment Mode:</span> <br>
            <input type="text" id="input1" placeholder="Paylah!/VISA/Credit Card etc." v-model="pay_mode" />
        </div>

        <div id="Back">
            <RouterLink :to="'rentalunit/' + this.ContractId">
                <button class="button button2">Back</button>
            </RouterLink>
        </div>

        <div id="Pay">
                <button id="paybtn" class="button button2" v-on:click="pay">Pay</button>
        </div>
    </div>
</template>

<script>
import firebaseApp from '@/firebase.js';
import{ getFirestore, Timestamp } from "firebase/firestore";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "vue-router";

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            Address: "",
            PaymentAmount: "",
            PaymentDate: "",
            ContractId: "",
            PaymentId: "",
            useremail: "",
            pay_mode: "",
            OwnerEmail: "",
            TenantName: "",
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
        const route = useRoute();
        await this.fetchAndUpdateData(this.useremail);
    },

    methods: {
        async fetchAndUpdateData(useremail) {
            this.PaymentId = "ApPcATa3tCDMiwGdhKL3";
            // get payment data
            let paymentRef = doc(db, "Payment", this.PaymentId);
            let paymentSnap = await getDoc(paymentRef);
            if (paymentSnap.exists()) {
                console.log("Payment Document data:", paymentSnap.data());
            } else {
                // paymentSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            let paymentData = paymentSnap.data();
            this.OwnerEmail = paymentData.OwnerEmail;

            // get contract data
            this.ContractId = paymentData.ContractId;
            console.log("contractId:", this.ContractId);
            let contractRef = doc(db, "Contract", this.ContractId);
            let contractSnap = await getDoc(contractRef);
            let contractData = contractSnap.data();

            // get property data
            let propertyId = contractData.PropertyId;
            let propertyRef = doc(db, "Property", propertyId);
            let propertySnap = await getDoc(propertyRef);
            let propertyData = propertySnap.data();

            // get tenant name
            let tenantRef = doc(db, "Tenant", this.useremail);
            let tenantSnap = await getDoc(tenantRef);
            this.TenantName = tenantSnap.data().Name;
            
            this.Address = propertyData.PropAddress;
            this.PaymentAmount = "$" + contractData.RentalCost;
            this.PaymentDate = new Date().toLocaleDateString();
        },

        async pay() {
            // to update payment status to "Pending"
            alert("Submitting Payment Claim");
            try{
                const paymentDocRef = doc(db, "Payment", this.PaymentId);

                console.log(this.pay_mode);
                await updateDoc(paymentDocRef, {
                    "PaymentDate": Timestamp.now(),
                    "Status": "Pending",
                    "Mode": this.pay_mode
                });

                this.$emit("pending");

                // send notif to Owner
                let date = new Date().toLocaleDateString()
                addDoc(collection(db, "Notification"), {
                    ContractId: this.ContractId,
                    Date: date,
                    Message: 
                        "Tenant: " + 
                        this.TenantName + 
                        " has paid payment of $" + 
                        this.PaymentAmount + 
                        " on " + 
                        date +
                        ".",
                    OwnerEmail: this.OwnerEmail,
                    TenantEmail: this.useremail,
                    Receiver: "Owner"
                });

                alert("Payment Claim successfully logged")
                this.$router.push("/rental");
            }
            catch(error) {
                console.error("Error executing payment", error)
            }
        }
    }
    
}
</script>

<style scoped>
.card {
    /* width: 70%; */
    align-self: center;
    display: grid;
    grid-gap: 20px;
    grid-template: 
    "a b c"
    "a d d"
    "a e f";
    grid-auto-rows: 1fr;
    grid-auto-columns: 1fr;
}

#Prop {
    grid-area: a;
    width: 350px;
}

#PayAmt {
    grid-area: b;
}

#PayDate {
    grid-area: c;
}

#PayMode {
    padding: 15px 0px 15px 0px;
    grid-area: d;
}

#Back {
    grid-area: e;
}

#Pay {
    grid-area: f;
}

.propcard {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    background-color: var(--color-background);
    padding: 15px 0px 15px 0px;
}
.card2 {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    background-color: var(--color-background);
    padding: 15px 0px 15px 0px;
    text-align: center;
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

.button2 {
    width: 100%;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2rem;
}
</style>