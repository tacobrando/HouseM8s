<template>
  <div class="task-container select-text">
    <span class="text-xl font-bold">
      Add {{ title }}
    </span>
    <div class="input w-full lg:w-[calc(50%-7.5px)] mt-2">
      <Input @add="addItem" />
    </div>
    <div class="lg:flex justify-between items-start mt-2">
      <div class="list-container w-full lg:mr-2">
        <div class="text-xl font-bold">
          Tasks
        </div>
        <span v-if="store.list.length <= 0" class="text-start text-gray-400 my-4">
          No items! 😱
        </span>
        <div>
          <transition-group name="slide-down" tag="div" class="list">
            <Task 
              @update="toggleItem"
              @delete="deleteItem" 
              v-for="item in store.list" 
              :key="item.id" :task="item" 
            />
          </transition-group>
        </div>
      </div>
      <div class="completed-container w-full lg:ml-2">
        <div class="text-xl font-bold">
          Completed
        </div>
        <span v-if="store.completed.length <= 0" class="text-start my-4 text-gray-400">
          Nothing completed. 🤔
        </span>
        <div>
          <transition-group name="slide-down" tag="div" class="list">
            <Task 
              @update="toggleItem"
              @delete="deleteItem" 
              v-for="item in store.completed" 
              :key="item.id" :task="item" 
            />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from '@/components/Input.vue';
import Task from '@/components/Task.vue';
import { onBeforeMount } from 'vue';

const { store, title } = defineProps({
  store: Object,
  title: String
});

const emit = defineEmits(['add', 'update', 'delete']);

const addItem = (item) => store.addItem(item);
const deleteItem = (id) => store.deleteItem(id);
const toggleItem = (id) => store.toggleComplete(id);

onBeforeMount(() => store.init())
</script>
