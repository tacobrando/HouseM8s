<template>
  <div class="task-container select-none relative bg-[#242424] top-0 -mt-4 z-30">
    <div class="bg-[#242424] relative z-20 pt-4">
      <span class="text-xl font-bold">
        Add {{ title }}
      </span>
      <div class="input w-full lg:w-[calc(50%-7.5px)] pb-4 mt-2 z-20 relative">
        <Input @add="addItem" />
      </div>
    </div>
    <div class="lg:flex justify-between items-start z-10 bg-[#242424]">
      <ListAccordion 
        name="Tasks"
        :show="store.showList" 
        :length="store.list.length" 
        class="relative z-[5] pb-2 bg-[#242424]"
      >
        <Task 
          @update="toggleItem"
          @delete="deleteItem" 
          v-for="item in store.list" 
          :key="item.id" :task="item" 
        />
      </ListAccordion>
      <ListAccordion 
        name="Completed"
        :show="store.showList" 
        :length="store.completed.length" 
        class="relative -z-0 bg-[#242424]"
      >
        <Task 
          @update="toggleItem"
          @delete="deleteItem" 
          v-for="item in store.completed" 
          :key="item.id" :task="item" 
        />
      </ListAccordion>
    </div>
  </div>
</template>

<script setup>
import Input from '@/components/Input.vue';
import Task from '@/components/Task.vue';
import ListAccordion from '@/components/ListAccordion.vue'
import { onBeforeMount } from 'vue';

const { store, title } = defineProps({
  store: Object,
  title: String
});

// const showList = reactive({
//   toggle(string) {
//     store.showList[string] = !store.showList[string]
//   }
// })

const emit = defineEmits(['add', 'update', 'delete']);

const addItem = (item) => store.addItem(item);
const deleteItem = (id) => store.deleteItem(id);
const toggleItem = (id) => store.toggleComplete(id);

onBeforeMount(() => store.init())
</script>
