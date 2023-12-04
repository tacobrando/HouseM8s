<template>
  <div class="task-container select-none relative bg-default top-0">
    <div class="lg:flex justify-between items-start bg-inherit">
      <ListAccordion 
        name="Tasks"
        :show="store.showList" 
        :length="store.list.length" 
        class="pb-2 bg-inherit"
        :groupId="groupId"
      >
        <Task 
          @update="toggleItem"
          @delete="deleteItem" 
          v-for="item in store.list" 
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

const { store, title, groupId } = defineProps({
  store: Object,
  title: String,
  groupId: Number
});

const emit = defineEmits(['add', 'update', 'delete']);

const deleteItem = (id) => store.deleteItem(id);
const toggleItem = (id) => store.toggleComplete(id);
</script>
