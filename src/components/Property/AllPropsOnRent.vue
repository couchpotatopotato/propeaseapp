<script>
import firebaseApp from "@/firebase.js";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

export default {
    data() {
        return {
            properties: [],
        };
    },
    methods: {
        async loadAllPropsOnRent() {
            const db = getFirestore(firebaseApp);

            // Collect data from relevant Collections
            const propColRef = collection(db, "Property");
            const allProperty = await getDocs(propColRef);

            // Promise.all to ensure all async operations are over.
            // to iterate over all documents and create arrays of promises
            this.properties = await Promise.all(
                allProperty.docs.map(async (porpDoc) => {
                    let propertyData = porpDoc.data();

                    let IsRented = propertyData.IsRented;
                    let OwnerEmail = propertyData.OwnerEmail;
                    let PropAddress = propertyData.PropAddress;
                    let PropName = propertyData.PropName;
                    let PropertyId = porpDoc.id;

                    // Accessing Owner details
                    const ownerRef = doc(db, "Owner", OwnerEmail);
                    const owner = await getDoc(ownerRef);
                    let ownerData = owner.data();
                    let ownerName = ownerData.Name;
                    let ownerPhone = ownerData.Phone;

                    return {
                        IsRented,
                        OwnerEmail,
                        PropAddress,
                        PropName,
                        PropertyId,
                        ownerName,
                        ownerPhone,
                    };
                })
            );
        }
    },
    mounted() {
        this.loadAllPropsOnRent();
    },
    created() {
        var scripts = [
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
            "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js",
        ];
        scripts.forEach((script) => {
            let tag = document.createElement("script");
            tag.setAttribute("src", script);
            document.head.appendChild(tag);
        });
    },
}
</script>


<template>
    <div class="container-fluid px-4 overflow-hidden" id="allProps">
        <div class="row gy-5"> <!---->
            <div class="col-md-12 col-lg-4 col-xxl-3" v-for="prop in properties" :key="prop.PropertyId" > <!--v-show="prop.IsRented"-->
                <div class="card p-3" style="margin-top: 10px;">
                    <img class="card-img-top" src="../../assets/landingPgimg2.jpg" alt="property img">
                    <div class="card-body">
                        <h4 class="card-title" style="font-weight: bold;">{{ prop.PropName }}</h4>
                        <p class="card-text">Address: {{ prop.PropAddress }}</p>

                        <br>

                        <p class="card-text">
                            <span style="font-weight: bold;">{{ prop.ownerName }}</span> <br>
                            <span>Email: {{ prop.OwnerEmail }}</span> <br>
                            <span>Phone: {{ prop.ownerPhone }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";

#allProps {
    padding: 0 10px 30px 10px;
}
</style>
