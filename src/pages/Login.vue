<template>
  <div class="login-container">
    Login
    <span>
      <input v-model="authStore.username" type="text" name="username" id="username-input" placeholder="Username">
      <input v-model="authStore.password" type="password" name="password" id="username-input" placeholder="Password">
      <button @click="login">Login</button>
    </span>
    <button @click="registerUser">Register Test</button>
    <!-- <button v-if="userStore.id" @click="getCookie">Get Cookie</button> -->
  </div>
</template>
<script setup>
import { useAuthStore } from '@/composables/auth'
import { useUserStore } from '@/composables/user';
import { toast } from '@/composables/toast'
import { reactive } from 'vue';

const authStore = useAuthStore()
const userStore = useUserStore()

function isFilled(str) { return !!str }

const loginInfo = reactive({
  username: "Test",
  password: "monkey"
})



const registerInfo = reactive({
  username: 'Test',
  email: 'test@tester.com',
  password: 'monkey',
  confirmPassword: 'monkey'
})


async function registerUser() {
  // console.log(isFilled(newUserInfo.username))
  for(const field in registerInfo) {
    if(!isFilled(registerInfo[field])) {
      console.log(`${field} not filled!`)
      return
    }
  }
  await userStore.registerUser(registerInfo)
}

async function login() {
  if(!isFilled(authStore.username) && !isFilled(authStore.password)) {
    return toast.showError("Field is required!")
  }
  await authStore.loginUser()
}

async function getCookie() {
  await userStore.getCookie()
}
</script>