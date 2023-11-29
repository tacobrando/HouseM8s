<template>
  <div class="groceries-container m-4">
    <TaskList :store="groceryStore" title="Groceries" />
  </div>
</template>
<script setup>
import { useGroceryStore } from '@/composables/grocery'
import TaskList from '@/components/TaskList.vue'

const groceryStore = useGroceryStore()
</script>