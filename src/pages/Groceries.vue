<template>
  <div class="groceries-page m-4">
    <div v-if="groupStore.groupId !== null" class="groceries-container">
      <div class="bg-inherit dark:bg-default">
        <span class="text-xl font-bold dark:text-white">
          Add Groceries
        </span>
        <div class="groceries-input w-full lg:w-[calc(50%-7.5px)] pb-4 mt-2">
          <Input :priceSelect="true" type="text" name="task" placeholder="Enter groceries" @add="addItem" />
        </div>
      </div>
      <div class="groceries-list">  
        <TaskList name="Groceries" :groupId="groupStore.groupId" :store="groceryStore" />
      </div>
    </div>
    <div v-else>
      Select a group
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useGroupStore } from '@/store/group'
import { useGroceryStore } from '@/store/grocery'
import TaskList from '@/components/TaskList.vue'
import Input from '@/components/Input.vue';

const groupStore = useGroupStore()

const groceryStore = useGroceryStore()

const addItem = async (item) => await groceryStore.addItem(item, groupStore.groupId);

onBeforeMount(() => groceryStore.init())
</script>