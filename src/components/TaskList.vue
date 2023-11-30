<template>
  <div class="task-container">
    <span class="text-xl font-bold">
      Add {{ title }}
    </span>
    <div class="input w-full lg:w-[calc(50%-7.5px)] my-2">
      <Input @add="addItem" />
    </div>
    <div class="lg:flex justify-between items-start">
      <div class="list-container w-full lg:mr-2">
        <div class="text-xl font-bold">
          Tasks
        </div>
        <span v-if="store.list.length <= 0" class="text-start my-4">
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
      <div class="completed-container w-full mt-2 lg:ml-2">
        <div class="text-xl font-bold">
          Completed
        </div>
        <span v-if="store.completed.length <= 0" class="text-start my-4">
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

const props = defineProps({
  store: Object,
  title: String
});

const emit = defineEmits(['add', 'update', 'delete']);

function addItem(item) {
  props.store.addItem(item);
}

function deleteItem(id) {
  props.store.deleteItem(id);
}

function toggleItem(id) {
  props.store.toggleComplete(id);
}
</script>
