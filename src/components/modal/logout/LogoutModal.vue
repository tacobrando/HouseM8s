<template>
  <Modal :hideBtn="true" :isOpen="isOpen" @update:isOpen="update">
    <div class="p-3 mt-3 text-center text-black dark:text-white">
      <p class="text-lg">Are you sure you want to logout?</p>
      <div class="flex justify-evenly space-x-4 mt-4">
        <button class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600" @click="logout">Logout</button>
        <button class="px-4 py-2 rounded-md dark:text-white hover:text-gray-500 dark:hover:text-gray-700"  @click="update(false)">Cancel</button>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import Modal from '@/components/modal/modal.vue'
const { isOpen, update, logout } = defineProps({
  isOpen: Boolean,
  update: Function,
  logout: Function
})
</script>