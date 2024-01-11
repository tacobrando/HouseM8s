<template>
  <div 
    ref="taskRef"
    class="task-container flex justify-between items-center text-black shadow-md border-2 dark:border-0 mt-2 p-2 rounded-md relative" 
    v-if="task.groupId === groupId"
    :class="[ task.completed.userId !== null ? 'bg-gray-400':'bg-white']"
  >
    <div class="flex-none">
      <Checkbox 
        :disabled="task.completed.userId !== userInfo.id && task.completed.userId !== null" 
        :completed="task.completed.userId" 
        @toggle="toggleComplete(task.id)" 
      />
    </div>
    <div class="flex-grow flex justify-between items-center">
      <div class="task-details flex flex-col">
        <span 
          class="text-sm font-medium flex items-center"
          :class="[ task.completed.userId ? 'text-gray-500':'text-gray-400']"
        >
          <ProfileAvatar v-if="taskUser" :img="taskUser.image" class="w-4 h-4 mr-1" />
          {{ task.user.name }}
        </span>
        <span 
          class="flex-1 break-all"
          :class="[ task.completed.userId ? 'text-gray-600':'']"
        >
          {{ task.item }}
        </span>
        <span 
          v-if="task.price"
          :class="[ task.completed.userId ? 'text-gray-500':'text-gray-400']"
          class="task-price text-sm font-medium"        
        >
          Price: {{ currency }}{{ task.price }}
        </span>
        <span 
          :class="[ task.completed.userId ? 'text-gray-500':'text-gray-400']"
          class="task-price text-sm font-medium"        
        >
          Completed by: {{ task.completed.name || 'TBD' }}
        </span>
      </div>
      <div 
        :class="[ task.completed.userId ? 'text-gray-500':'text-gray-400']"
        class="task-details text-sm font-medium text-end sm:text-start flex flex-col"
      >
        <span class="task-date">
          {{ formattedDate }}
        </span>
      </div>
    </div>
    <div class="text-white flex-none ml-2">
      <button class="bg-red-400 rounded-full text-white h-7 w-7 select-none" @click="deleteItem(task.id)">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useGroupStore } from '@/store/group';
import { computed, onMounted, ref, watchEffect, watch } from 'vue';
import moment from 'moment';
import Checkbox from './ui/Checkbox.vue';
import ProfileAvatar from './profile/ProfileAvatar.vue';

const taskRef = ref(null);
const { userInfo, getUser } = useUserStore()
const { currency } = useGroupStore()

const emit = defineEmits(['delete', 'update']);
const { task, groupId } = defineProps(['task', 'groupId']);

const formattedDate = computed(() => moment(task.createdAt).fromNow())

const taskUser = ref({})

function deleteItem (id) {
  if (taskRef.value) {
    taskRef.value.classList.add('animate-slide-out');
    setTimeout(() => {
      emit("delete", id);
    }, 200);
  }
}

const toggleComplete = (id) => emit('update', id)

onMounted(async () => {
  if (taskRef.value) {
    taskRef.value.classList.add('animate-slide-down');
  }
  taskUser.value = await getUser(task.user.userId)
});
</script>
