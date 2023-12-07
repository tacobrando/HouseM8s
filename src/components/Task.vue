<template>
  <div 
    ref="taskRef"
    class="task-container flex justify-between items-center text-black mt-2 p-2 rounded-md relative" 
    v-if="task.groupId === groupId"
    :class="[ task.completed ? 'bg-gray-400':'bg-white']"
  >
    <div class="flex-none">
      <Checkbox :completed="task.completed" @toggle="toggleComplete(task.id)" />
    </div>
    <div class="flex-grow flex justify-between items-center">
      <div class="task-details flex flex-col">
        <span 
          class="text-sm font-medium"
          :class="[ task.completed ? 'text-gray-500':'text-gray-400']"
        >
          {{ task.user }}
        </span>
        <span 
          class="flex-1 break-all"
          :class="[ task.completed ? 'text-gray-600':'']"
        >
          {{ task.item }}
        </span>
      </div>
      <span 
        class="task-date text-sm font-medium text-end sm:text-start"
        :class="[ task.completed ? 'text-gray-500':'text-gray-400']"
      >
        {{ formattedDate }}
      </span>
    </div>
    <div class="text-white flex-none ml-2">
      <button class="bg-red-400 rounded-full text-white h-7 w-7 select-none" @click="deleteItem(task.id)">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';
import Checkbox from './ui/Checkbox.vue';

const taskRef = ref(null);


const emit = defineEmits(['delete', 'update']);
const { task, groupId } = defineProps(['task', 'groupId']);

const formattedDate = computed(() => moment(task.createdAt).fromNow())

function deleteItem (id) {
  if (taskRef.value) {
    taskRef.value.classList.add('animate-slide-out');
    setTimeout(() => {
      emit("delete", id);
    }, 200);
  }
}

const toggleComplete = (id) => emit('update', id)

onMounted(() => {
  if (taskRef.value) {
    taskRef.value.classList.add('animate-slide-down');
  }
});

</script>
