<template>
  <div class="groceries-page m-4">
    <div v-if="groupStore.groupId !== null" class="groceries-container">
      <div class="bg-inherit">
        <span class="text-xl font-bold">
          Add Groceries
        </span>
        <div class="groceries-input w-full lg:w-[calc(50%-7.5px)] pb-4 mt-2">
          <Input @add="addItem" />
        </div>
      </div>
      <div class="groceries-list">  
        <TaskList :groupId="groupStore.groupId" :store="groceryStore" />
      </div>
    </div>
    <div v-else>
      Select a group
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useGroceryStore } from '@/composables/grocery'
import { useGroupStore } from '@/composables/group'

import TaskList from '@/components/TaskList.vue'
import Input from '@/components/Input.vue';

const groupStore = useGroupStore()

const groceryStore = useGroceryStore()

const addItem = async (item) => await groceryStore.addItem(item, groupStore.groupId);

onBeforeMount(() => groceryStore.init())
</script>