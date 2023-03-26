<script>
import Login from "../components/User/Login.vue";
import Registration from "../components/User/Registration.vue";
import ForgetPW from "../components/User/ForgetPW.vue";

export default {
    data() {
        let showRegist;
        let showLogin = true;
        let showResetPW;

        return {
            showRegist,
            showLogin,
            showResetPW,
        };
    },
    components: {
        Login,
        Registration,
        ForgetPW,
    },
    methods: {
        showRegistFunc(value) {
            this.showRegist = true;
            this.showLogin = false;
            this.showResetPW = false;
        },

        showLoginFunc(value) {
            this.showRegist = false;
            this.showLogin = true;
            this.showResetPW = false;
        },

        showResetPWFunc(value) {
            this.showRegist = false;
            this.showLogin = false;
            this.showResetPW = true;
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
    <div class="register-photo">
        <div class="form-container">
            <div class="image-holder"></div>
            
            <Login @showRegist="showRegistFunc($event)" v-if="showLogin" @showResetPW="showResetPWFunc($event)"/>
            <Registration @showLogin="showLoginFunc($event)" v-if="showRegist"/>
            <ForgetPW @showLogin="showLoginFunc($event)" v-if="showResetPW"/>
        </div>
    </div>

</template>


<style scoped>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

.register-photo {
  background: #f1f7fc;
  padding: 30px 0;
}

.register-photo .image-holder {
  display: table-cell;
  width: auto;
  background: url("../assets/landingPgimg2.jpg");
  background-size: cover;
}

.register-photo .form-container {
  display: table;
  max-width: 1000px;
  width: 90%;
  margin: 0 auto;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
}

</style>