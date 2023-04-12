<template>
  <div id="maincontainer">
    <div>
      <h2 v-show="notifCount < 2">{{ notifCount }} Notification</h2>
      <h2 v-show="notifCount >= 2">{{ notifCount }} Notifications</h2>

      <RouterLink v-show="userType == 'Owner'" to="/notif">
        <button class="button">View</button>
      </RouterLink>
      <RouterLink v-show="userType == 'Tenant'" to="/tenantnotif">
        <button class="button">View</button>
      </RouterLink>

    </div>
    <br />
    <br />
    <div class="flexcontainer">
      <RouterLink v-show="userType == 'Owner'" to="/property">
        <button class="button button2">Property</button>
      </RouterLink>
      <RouterLink v-show="userType == 'Tenant'" to="/rental">
        <button class="button button2">Rental</button>
      </RouterLink>
      <RouterLink v-show="userType == 'Owner'" to="/dashboard">
        <button class="button button2">Dashboard</button>
      </RouterLink>
      <RouterLink v-show="userType == 'Tenant'" to="/browse">
        <button class="button button2">Browse</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.flexcontainer {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
}
.card {
  width: 50%;
}

#maincontainer {
  /*margin-left: 15%;*/
  margin-left: 10%;
  margin-top: 3%;
}

.button {
  width: 150px;
}

.button2 {
  width: 200px;
}
</style>

<script>
import firebaseApp from "@/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getFirestore,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "App",
  data() {
    return {
      userType: "",
      useremail: "",
      notifCount: 0,
    };
  },
  async mounted() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = user.email;

        // determine whether the user is an Owner or a Tenant
        const docRef = doc(db, "Owner", auth.currentUser.email);
        getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              // the user is an Owner
              this.userType = "Owner";
            } else {
              // the user is a Tenant
              this.userType = "Tenant";
            }
            return this.userType;
          })
          .then((userType) => {
            this.getNotifNumber(userType).then((notifCount) => {
              this.notifCount = notifCount;
            });
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
      }
    });
  },
  methods: {
    async getNotifNumber(userType) {
      let count = 0;
      const colRef = collection(db, "Notification");
      const allDocuments = await getDocs(colRef);

      console.log("try: " + userType);
      allDocuments.docs.map((documents) => {
        let documentData = documents.data();
        let tenantEmail = documentData.TenantEmail;
        let ownerEmail = documentData.OwnerEmail;
        let receiver = documentData.Receiver;

        if (userType == "Owner") {
          console.log("inside1");

          if (
            ownerEmail == this.useremail &&
            (receiver == "Owner" || receiver == "Both")
          ) {
            count += 1;
            console.log("inside2");
          }
        } else if (userType == "Tenant") {
          if (
            tenantEmail == this.useremail &&
            (receiver == "Tenant" || receiver == "Both")
          ) {
            count += 1;
          }
        }
      });
      console.log("count:" + count);

      return count;
    },
  },
};
</script>
