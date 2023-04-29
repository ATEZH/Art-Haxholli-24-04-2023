<template>
    <nav class="navbar navbar-expand-sm d-flex p-3" id="nav">
        <p class="d-flex m-0 ms-1 fs-3 align-middle w-50"><i style="font-size:40px;" class="fa-sharp fa-solid fa-database"></i>Student
            Information System</p>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
            aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-sm-flex justify-content-between w-100" id="navbarToggler">
            <ul class="navbar-nav w-50 d-flex-inline justify-content-evenly">
                <li class="nav-item">
                    <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'Students' }" class="nav-link">Students</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'Archive' }" class="nav-link">Archive</router-link>
                </li>
            </ul>
            <div class="d-sm-flex me-5">
                <a @click="logout()"><i class="fa-solid fa-right-from-bracket fa-2x"></i></a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header",
    methods: {
        logout() {
            sessionStorage.clear()
            this.$router.push("/login")
        }
    },
}
</script>

<style>
#nav {
    border-bottom: 1px solid #d2ccc0;
}
</style>