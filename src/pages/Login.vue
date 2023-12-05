<template>
  <div class="login-container">
    Login
    <span>
      <input v-model="authStore.username" type="text" name="username" id="username-input" placeholder="Username">
      <input v-model="authStore.password" type="password" name="password" id="username-input" placeholder="Password">
      <button @click="login">Login</button>
      <button @click="logout">Logout</button>
    </span>
    <button @click="registerUser">Register Test</button>
    <!-- <button v-if="userStore.id" @click="getCookie">Get Cookie</button> -->
  </div>
</template>
<script setup>
import { useAuthStore } from '@/composables/auth'
import { useUserStore } from '@/composables/user';
import { toast } from '@/composables/toast'

const authStore = useAuthStore()
const userStore = useUserStore()

function isFilled(str) { return !!str }

async function registerUser() {
  for(const field in userStore.registerInfo) {
    if(!isFilled(userStore.registerInfo[field])) {
      console.log(`${field} not filled!`)
      return
    }
  }
  await userStore.registerUser()
}

async function login() {
  if(!isFilled(authStore.username) && !isFilled(authStore.password)) {
    return toast.showError("Field is required!")
  }
  await authStore.loginUser()
}

async function logout() {
  await authStore.logoutUser()
}
</script>