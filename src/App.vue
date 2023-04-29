<template>
  <div>
    <router-view />
  </div>
</template>

<script>

const admins = [
  {username: "admin1", password: "123456"},
  {username: "admin2", password: "123456"}
]
localStorage.setItem("admins", JSON.stringify(admins))

export default {
  name: "App",
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
