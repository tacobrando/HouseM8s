<template>
  <form @submit.prevent="addItem" class="input-container">
  <div class="flex" v-bind="$attrs">
    <input 
      @submit="addItem"
      v-model="itemRef.item" 
      class="p-2 rounded-l-md rounded-r-none border-l-2 border-t-2 border-b-2 outline-none bg-white text-black w-full"
      :type="type" 
      :name="name" 
      :placeholder="placeholder"
      :maxlength="maxlength"
    >
    <button 
      :disabled="itemRef.item.length < 1"
      @click="addItem" 
      :class="{
        'bg-blue-500': itemRef.item.length >= 1, 
        'bg-gray-300': itemRef.item.length < 1
      }" 
      class="p-2 rounded-r-md transition-colors flex items-center"
    >
      <font-awesome-icon :icon="['fas', 'plus']" class="h-5 w-5" />
    </button>
  </div>
  </form>
</template>
<script setup>
import { reactive } from 'vue';
import { useUserStore } from '@/composables/user';
const { placeholder } = defineProps({
  placeholder: String,
  maxlength: {
    type: String,
    default: '50'
  },
  name: String,
  type: String
})

const emit = defineEmits()
const userStore = useUserStore()

const itemRef = reactive({
  user: {
    userId: userStore.userInfo.id,
    name: userStore.userInfo.username
  },
  item: '',
})

function resetRef() {
  itemRef.item = ''
}

function addItem() {
  if(itemRef.item.length >= 1) {
    emit('add', { ...itemRef })
    resetRef()
  }
}
</script>