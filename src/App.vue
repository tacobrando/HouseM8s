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
import { onBeforeMount, onMounted } from 'vue';
import { useSocket } from '@/composables/socket.io';

const settings = useSettingsStore()
const socket = useSocket()

const groceryStore = useGroceryStore()
const choreStore = useChoreStore()

onBeforeMount(() => {
  socket.init()
  settings.initializeDarkMode();
  groceryStore.init()
  choreStore.init()
})
</script>