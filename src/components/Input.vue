<template>
  <form @submit.prevent="addItem" class="input-container">
    <input 
      @submit="addItem"
      v-model="itemRef.item" 
      class="p-2 rounded-l-md rounded-r-none outline-none bg-white text-black" 
      type="text" 
      name="task" 
      placeholder="Enter input..."
      maxlength="100"
    >
    <button 
      :disabled="itemRef.item.length < 1"
      @click="addItem" 
      :class="{
        'bg-blue-500': itemRef.item.length >= 1, 
        'bg-gray-300': itemRef.item.length < 1
      }" 
      class="p-2 rounded-r-md transition-colors"
    >
      Add Task
    </button>
  </form>
</template>
<script setup>
import { reactive } from 'vue'

const emit = defineEmits()

const itemRef = reactive({
  id: Math.random(),
  item: '',
  createdAt: new Date()
})

function resetChoreRef() {
  itemRef.id = Math.random()
  itemRef.item = ''
  itemRef.createdAt = new Date()
}

function addItem() {
  if(itemRef.item.length > 1) {
    emit('add', { ...itemRef })
    resetChoreRef()
  }
}
</script>