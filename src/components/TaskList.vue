<template>
  <div class="task-container select-none relative bg-white dark:bg-default dark:text-white top-0">
    <div class="lg:flex justify-between items-start bg-inherit">
      <ListAccordion 
        :name="name"
        :show="store.showList" 
        :length="store.list.length" 
        class="pb-2 bg-inherit"
        :groupId="groupId"
      >
        <Task 
          @update="toggleItem"
          @delete="deleteItem" 
          v-for="item in sortedList" 
          :key="item.id" :task="item"
          :groupId="groupId"
        />
      </ListAccordion>
      <ListAccordion 
        name="Completed"
        :show="store.showList" 
        :length="store.completed.length" 
        :groupId="groupId"
        class="relative bg-inherit"
      >
        <Task 
          @update="toggleItem"
          @delete="deleteItem" 
          v-for="item in store.completed"
          :key="item.id" :task="item" 
          :groupId="groupId"
        />
      </ListAccordion>
    </div>
  </div>
</template>

<script setup>
import Task from '@/components/Task.vue';
import ListAccordion from '@/components/ListAccordion.vue'
import { computed } from 'vue';

const { store, title, groupId, name } = defineProps({
  store: Object,
  title: String,
  groupId: String,
  name: {
    type: String,
    default: "Tasks"
  }
});

const sortedList = computed(() => store.list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))

const emit = defineEmits(['add', 'update', 'delete']);

const deleteItem = async(id) => await store.deleteItem(id, groupId);
const toggleItem = (id) => store.toggleComplete(id, groupId);
</script>
