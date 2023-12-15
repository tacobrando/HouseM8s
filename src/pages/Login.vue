<template>
  <div class="login-container">
    Login
    <span>
      <input v-model="authStore.username" type="text" name="username" id="username-input" placeholder="Username">
      <input v-model="authStore.password" type="password" name="password" id="username-input" placeholder="Password">
      <button @click="login">Login</button>
      <button @click="logout">Logout</button>
    </span>
    <button @click="registerModal.toggle">Register</button>
    <RegisterModal :isOpen="registerModal.value" :update="registerModal.update"  />
  </div>
</template>
<script setup>
import RegisterModal from '@/components/modal/register/RegisterModal.vue';
import { useAuthStore } from '@/composables/auth'
import { toast } from '@/composables/toast'
import { reactive } from 'vue';
import { isFilled } from '@/utils/Helpers';

const authStore = useAuthStore()

const registerModal = reactive({
  value: false,
  toggle() {
    registerModal.value = !registerModal.value
  },
  update(value) {
    registerModal.value = value
  }
})

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