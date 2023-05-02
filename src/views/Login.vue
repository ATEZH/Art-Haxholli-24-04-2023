<template>
    <div class="container-fluid position-absolute translate-middle p-5 login">
        <div class="d-flex flex-inline justify-content-center align-items-middle mb-4">
            <i class="fa-solid fa-database fa-3x me-2"></i>
            <div class="fs-2 fw-semibold text-center">Student Information System</div>
        </div>
        <form action="" class="row d-flex justify-content-center" @submit.prevent="login()">
            <div class="d-flex d-md-flex-inline flex-wrap mb-4">
                <div class="col-12 col-lg-4"><label for="username" class="form-label me-4 fs-5">Username:</label></div>
                <div class="col-12 col-lg-8"><input v-model="username" type="text" class="form-control" id="username">
                    <span class="m-0 error" v-for="error in v$.username.$errors" :key="error.$uid">{{ error.$message
                    }}</span>
                </div>
            </div>
            <div class="d-flex d-md-flex-inline flex-wrap mb-4">
                <div class="col-12 col-lg-4"><label for="password" class="form-label me-4 fs-5">Password:</label></div>
                <div class="col-12 col-lg-8"><input v-model="password" type="password" class="form-control" id="password">
                    <span class="m-0 error" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message
                    }}</span>
                </div>
            </div>
            <span class="mb-3 error" v-show="incorrectValue">Username or password is incorrect</span>
            <div class="col d-flex justify-content-center">
                <input type="submit" value="Log in" class="btn btn-primary">
            </div>
        </form>
    </div>
</template>
  
<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const storedAdmins = JSON.parse(localStorage.getItem("admins"));
export default {
    name: "Login",
    setup: () => ({
        v$: useVuelidate()
    }),
    data: () => ({
        username: "",
        password: "",
        incorrectValue: false
    }),
    validations() {
        return {
            username: { required },
            password: { required }
        }
    },
    methods: {
        async login() {
            const result = await this.v$.$validate()
            if (result) {
                this.verifyAdmin()
            } else {
                return
            }
        },
        verifyAdmin() {
            const index = storedAdmins.findIndex((admin)=>admin.username === this.username && admin.password === this.password)
            if(index !== -1){
                let sessionAdminData = { username: this.username, password: this.password }
                sessionStorage.setItem("admin", JSON.stringify(sessionAdminData))
                this.$router.push({ name: "Home" })
            } else {
                this.incorrectValue = true
                setTimeout(() => {
                    this.incorrectValue = false
                }, 7000)
            }
        }
    }
}

</script>
  
<style>
.login {
    background-color: inherit;
    width: 40%;
    top: 40%;
    left: 50%;
    border-radius: 6px;
    box-shadow: #d5d5d5 0px 0px 40px;
}

.error {
    color: #ff1818;
}

@media only screen and (max-width: 768px) {
    .login {
        width: 60%;
    }
}
</style>
  
