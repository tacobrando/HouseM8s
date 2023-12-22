<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/layout/AppLayout.vue';
import { useChoreStore } from '@/composables/chore';
import { useGroceryStore } from '@/composables/grocery';
import { useSettingsStore } from '@/composables/settings';
import { onBeforeMount } from 'vue';

const settings = useSettingsStore()

const groceryStore = useGroceryStore()
const choreStore = useChoreStore()

onBeforeMount(() => {
  settings.initializeDarkMode();
  groceryStore.init()
  choreStore.init()
})
</script>

<style scoped>
</style>
