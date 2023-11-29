<template>
  <div 
    class="task-container flex justify-between items-center text-black my-2 p-2 rounded-md" 
    :class="[ task.completed ? 'bg-gray-600':'bg-gray-400']"
  >
    <div class="flex-none">
      <button 
        @click="toggleComplete(task.id)" 
        class="h-7 w-7 shadow-inner transition-all border border-gray-200  rounded-full mr-3" 
        :class="[task.completed ? 'bg-pink-400' : 'bg-gray-200']"
      >
          <font-awesome-icon 
            icon="fa-solid fa-check" 
            class="transition-all" 
            :class="[task.completed ? 'text-white':'text-gray-200']"
          />
      </button>
    </div>
    <div class="flex-grow">
      <span 
        class="block text-sm font-medium "
        :class="[ task.completed ? 'text-gray-400':'text-gray-100']"
      >
        {{ formatDate(task.createdAt) }}
      </span>
      <span 
        class="flex-1 break-all"
        :class="[ task.completed ? 'text-gray-300':'']"
      >
        {{ task.item }}
      </span>
    </div>
    <div class="text-white flex-none ml-2">
      <button class="bg-red-400 rounded-full text-white h-7 w-7" @click="deleteItem(task.id)">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';

const emit = defineEmits(['delete', 'update']);
const { task, bg } = defineProps(['task', 'bg']);

function deleteItem(id) {
  emit("delete", id);
}

function formatDate(date) {
  return moment(date).calendar();
}

function toggleComplete(id) {
  emit('update', id)
}
</script>
