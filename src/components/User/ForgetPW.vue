<script>
import firebaseApp from '@/firebase.js';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default {
    data() {
        return {
            email: ''
        };
    },
    emits: ["showLogin"],
    methods: {
        showLogin() {
            this.$emit("showLogin", true);
        },
        sendPwResetLink() {
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    alert("Password reset email sent!");
                })
                .catch((error) => {
                    alert(error.message);
                })
        }
    },
    created() {
        var scripts = [
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
            "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js",
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
    <form @submit.prevent="sendPwResetLink">
        <h1 class="text-center">
            <strong>Reset Password</strong>
        </h1>
        <p class="text-center" style="color: grey;">Please enter your registered email, so we can send you a link to reset your password.</p>

        <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="email" id="email" name="email" placeholder="Enter your Registered Email" required v-model="email">
        </div>

        <br>

        <div class="form-group">
            <button class="btn btn-success btn-block" type="submit">Send Link</button>
        </div>

        <div class="form-group">
            <p class="already">Got back your password?<button class="txtBtn" @click="showLogin">Sign in</button>
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
