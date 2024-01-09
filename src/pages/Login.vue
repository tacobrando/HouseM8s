<template>
  <div class="login-container flex flex-col items-center justify-center h-full">
    <div class="image-main-container w-1/2 md:w-1/4 mb-4 flex items-center justify-center">
      <img :src="imageUrl" />
    </div>
    <div>
      <form @submit.prevent="login" class="flex flex-col items-center dark:text-black">
        <input 
          v-model="authStore.username" 
          class="dark:bg-white bg-gray-300 border p-2 mb-1 rounded-md" 
          type="text" name="username" 
          id="username-input" 
          placeholder="Username"
        >
        <input 
          v-model="authStore.password"
          class="dark:bg-white bg-gray-300 border p-2 mt-1 mb-3 rounded-md"
          type="password"
          name="password" 
          id="password" 
          placeholder="Password"
        >
        <button class="bg-blue-500 w-full p-2 rounded-md text-white">Login</button>
        <span class="border-y-2 border-gray-300 w-1/2 text-center my-4 p-1 dark:text-white dark:border-gray-600">Or</span>
      </form>
      <button class="bg-green-500 w-full p-2 rounded-md text-white" @click="registerModal.toggle">Sign up</button>
      <RegisterModal :isOpen="registerModal.value" :update="registerModal.update"  />
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useAuthStore } from '@/store/auth'
import { toast } from '@/composables/toast'
import { isFilled } from '@/utils/Helpers';
import { useSettings } from '@/composables/settings';
import RegisterModal from '@/components/modal/register/RegisterModal.vue';
import imageWhite from '@/assets/img/HouseM8s-white.png'
import imageBlack from '@/assets/img/HouseM8s-black.png'

const authStore = useAuthStore()
const settings = useSettings()

const imageUrl = computed(() => settings.darkMode ? imageWhite : imageBlack)

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
</script>