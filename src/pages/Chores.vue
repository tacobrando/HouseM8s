<template>
  <div class="chores-container m-4">
    <TaskList :store="choreStore" title="Chores" />
  </div>
</template>
<script setup>
import { useChoreStore } from '@/composables/chore'
import TaskList from '../components/TaskList.vue';

const choreStore = useChoreStore()
</script>