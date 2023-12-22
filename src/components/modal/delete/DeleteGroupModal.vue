<template>
  <Modal :isOpen="isOpen" @update:isOpen="updateModal">
    <div class="p-3 mt-3 text-center dark:text-white text-black">
      <p class="text-lg">Are you sure you want to delete {{name}}?</p>
      <div class="flex justify-evenly space-x-4 mt-4">
        <button class="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600" @click="func">{{prompt}}</button>
        <button class="px-4 py-2 rounded-md text-blue-500 bg-inherit" @click="updateModal">Cancel</button>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import Modal from '@/components/modal/modal.vue';
const { isOpen } = defineProps({
  isOpen: Boolean,
  func: Function,
  prompt: String,
  name: String,
})

const emit = defineEmits(['update'])

function updateModal() {
  emit('update', false)
}
</script>