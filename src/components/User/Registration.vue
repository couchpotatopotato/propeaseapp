<script>
import firebaseApp from '@/firebase.js';
import { getFirestore, collection, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


export default {
    data() {
        return {
            fullname: '',
            contactNo: '',
            email: '',
            password: '',
            userType: '',
        };
    },
    emits: ["showLogin"],
    methods: {
        showLogin() {
            this.$emit("showLogin", true);
        },
        userRegistration() {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((cred) => {
                    const db = getFirestore(firebaseApp);
                    return setDoc(doc(db, String(this.userType), this.email), {
                        Name: this.fullname,
                        Phone: this.contactNo,
                        Email: this.email,
                    });
                })
                /*.then(() => {
                const db = getFirestore(firebaseApp);
                setDoc(doc(db, this.userType, this.email), {
                    Name: this.fullname,
                    Phone: this.contactNo,
                    Email: this.email,
                })
            }) */
        }
    },
    created() {
        var scripts = [
            "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        ];
        scripts.forEach(script => {
            let tag = document.createElement("script");
            tag.setAttribute("src", script);
            document.head.appendChild(tag);
        });
    },
};
</script>

<template>
    <form @submit.prevent="userRegistration">
        <h1 class="text-center"><strong>Welcome</strong></h1>

        <div class="form-group">
            <label for="fullName">Full Name</label>
            <input class="form-control" type="text" id="fullName" name="fullName" placeholder="John Doe" required v-model="fullname">
        </div>
        <div class="form-group">
            <label for="contactNo">Contact Number</label>
            <input class="form-control" type="text" id="contactNo" name="contactNo" placeholder="Enter your Contact Number" required v-model="contactNo">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="email" id="email" name="email" placeholder="Enter your Email" required v-model="email">
        </div>
        <div class="form-group">
            <label for="pw">Password</label>
            <input class="form-control" type="password" id="pw" name="pw" placeholder="Enter your Password" required v-model="password">
        </div>
        <div class="form-group">
            <label for="userType">User Type</label>
            <select class="form-control" id="userType" required v-model="userType">
                <option value="Owner" id="owner">Owner</option>
                <option value="Tenant" id="tenant">Tenant</option>
            </select>
        </div>

        <br>

        <div class="form-group">
            <button class="btn btn-success btn-block" type="submit">Create Account</button>
        </div>

        <div class="form-group">
            <p class="already">Already have an account?<button class="txtBtn" @click="showLogin">Sign in</button>
            </p>
        </div>
    </form>
</template>

<style scoped>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

form {
    display: table-cell;
    width: 400px;
    background-color: var(--color-background);
    padding: 40px 60px;
    color: var(--color-text);
}

@media (max-width:991px) {
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
    background-color: var(--color-darkblue);
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
