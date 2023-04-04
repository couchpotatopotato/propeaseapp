<script>
import firebaseApp from "@/firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      userType: "",
    };
  },
  emits: ["showRegist", "showResetPW"],
  methods: {
    showRegist() {
      this.$emit("showRegist", true);
    },
    showResetPW() {
      this.$emit("showResetPW", true);
    },
    userLogin() {
      // check if the user is under the specified UserType collection
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, String(this.userType), this.email);
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            // continue to sign in
            const auth = getAuth();

            // NEW LINE
            setPersistence(auth, browserLocalPersistence);

            signInWithEmailAndPassword(auth, this.email, this.password)
              .then(() => {
                this.$router.push({ name: "home" });
              })
              .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/user-not-found") {
                  alert("User not found in system.");
                } else if (errorCode === "auth/wrong-password") {
                  alert("Wrong password provided.");
                } else {
                  alert(error.message);
                }
              });
          } else {
            alert("This email has not been registered as " + this.userType);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
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
};
</script>

<template>
  <form @submit.prevent="userLogin">
    <h1 class="text-center"><strong>Sign in</strong></h1>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        class="form-control"
        type="email"
        id="email"
        name="email"
        placeholder="Enter your Email"
        required
        v-model="email"
      />
    </div>
    <div class="form-group">
      <label for="pw">Password</label>
      <input
        class="form-control"
        type="password"
        id="pw"
        name="pw"
        placeholder="Enter your Password"
        required
        v-model="password"
      />
    </div>
    <div class="form-group">
      <label for="userType">User Type</label>
      <select class="form-control" id="userType" required v-model="userType">
        <option value="Owner" id="owner">Owner</option>
        <option value="Tenant" id="tenant">Tenant</option>
      </select>
    </div>

    <br />

    <div class="form-group">
      <button class="btn btn-success btn-block" type="submit">Sign in</button>
    </div>

    <div class="form-group">
      <p class="already">
        Do not have an account?<button class="txtBtn" @click="showRegist">
          Create Account
        </button>
      </p>
    </div>

    <div class="form-group">
      <p class="already">
        <button class="txtBtn" @click="showResetPW">Reset Password</button>
      </p>
    </div>
  </form>
</template>

<style scoped>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";

form {
  display: table-cell;
  width: 400px;
  background-color: var(--color-background);
  padding: 40px 60px;
  color: var(--color-text);
}

@media (max-width: 991px) {
  .register-photo form {
    padding: 40px;
  }
}

form h1 {
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 30px;
  color: var(--color-darkblue);
}

form .form-control {
  background: var(--color-border);
  border: none;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
  text-indent: 6px;
  height: 40px;
}

select {
  -webkit-appearance: none;
}

.btn-success {
  background-color: var(--color-lightblue);
  border-radius: 0%;
  width: 65%;
  margin: 0 auto;
}

.btn-success:hover {
  background-color: var(--color-darkblue);
}

form .already {
  display: block;
  text-align: center;
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.9;
  text-decoration: none;
}

form .txtBtn {
  border: none;
  background-color: inherit;
  color: var(--color-darkblue);
  font-weight: bold;
}
</style>
