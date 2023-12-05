<template>
  <div class="chores-page m-4">
    <div v-if="groupStore.groupId !== null" class="chores-container">
      <div class="bg-inherit">
        <span class="text-xl font-bold">
          Add Chores
        </span>
        <div class="chore-input w-full lg:w-[calc(50%-7.5px)] pb-4 mt-2">
          <Input placeholder="Enter chores" @add="addItem" />
        </div>
      </div>
      <div class="chore-list">  
        <TaskList :groupId="groupStore.groupId" :store="choreStore" />
      </div>
    </div>
    <div v-else>
      Select a group
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useChoreStore } from '@/composables/chore'
import { useGroupStore } from '@/composables/group'

import Input from '@/components/Input.vue';
import TaskList from '@/components/TaskList.vue';

const choreStore = useChoreStore()
const groupStore = useGroupStore()

const addItem = async (item) => await choreStore.addItem(item, groupStore.groupId);

onBeforeMount(() => choreStore.init())
</script>