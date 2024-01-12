<template>
  <Modal :isOpen="isOpen" @update:isOpen="update">
    <div class="register-container">
      <div class="border-b dark:border-gray-600 border-gray-200 w-full p-4">
        <h1 class="text-xl font-bold text-start">Sign Up</h1>
        <p class="text-gray-500 text-sm">I mean, why not?</p>
      </div>
      <form @submit.prevent="submitForm" class="p-4">
        <div id="register-username">
          <input 
            type="text" 
            name="username" 
            placeholder="Username"
            class="border dark:border-gray-600 dark:bg-default bg-gray-100 py-1 px-2 rounded-md w-full" 
            v-model="registerInfo.username"
          >
        </div>
        <div id="register-email" class="py-2">
          <input 
            type="text" 
            name="email" 
            placeholder="Email"
            class="border bg-gray-100 py-1 px-2 rounded-md w-full"
            :class="[
              isValidEmail(registerInfo.email) || !registerInfo.email ? 'dark:border-gray-600' : 'border-red-500',
              'dark:bg-default'
            ]"
            v-model="registerInfo.email"
          >        
        </div>
        <div id="register-passwords">
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            class="border dark:border-gray-600 dark:bg-default bg-gray-100 py-1 px-2 rounded-md w-full" 
            v-model="registerInfo.password"
          >
          <input 
            type="password" 
            name="confirm password" 
            placeholder="Confirm password"
            class="border dark:border-gray-600 dark:bg-default bg-gray-100 py-1 px-2 rounded-md w-full mt-2" 
            v-model="registerInfo.confirmPassword"
          >
        </div>
        <div class="w-full flex items-center justify-center mt-4">
          <button 
            class="bg-green-500 p-1 w-1/2 text-lg font-bold text-white rounded-md transition-all"
            :disabled="!isFormValid"
            :class="[ !isFormValid ? '!bg-gray-300' : '' ]"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/user';
import { isFilled, isValidEmail } from '@/utils/Helpers';
import Modal from '@/components/modal/modal.vue'

const { isOpen, update } = defineProps({
  isOpen: Boolean,
  update: Function
})
const { registerUser, registerInfo } = useUserStore()

const isFormValid = computed(() => {
  return isFilled(registerInfo.username) && 
  isValidEmail(registerInfo.email) && 
      isFilled(registerInfo.password) && 
      registerInfo.password === registerInfo.confirmPassword
});

async function submitForm() {
  await registerUser()
  update(false)
}
</script>