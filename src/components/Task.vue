<template>
  <div 
    class="task-container flex flex-wrap justify-between items-center text-black my-2 p-2 rounded-md" 
    :class="[ task.completed ? 'bg-gray-500':'bg-white']"
  >
    <div class="flex-none">
      <button @click="toggleComplete(task.id)" class="h-7 w-7 transition-all border rounded-full mr-3" :class="{'bg-pink-400': task.completed}">
          <font-awesome-icon icon="fa-solid fa-check" class="text-white transition-all" />
      </button>
    </div>
    <div class="flex-grow">
      <span class="block text-sm font-medium text-gray-400">
        {{ formatDate(task.createdAt) }}
      </span>
      <span class="flex-1 break-all">
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
