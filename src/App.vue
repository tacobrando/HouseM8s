<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useChoreStore } from '@/store/chore';
import { useGroceryStore } from '@/store/grocery';
import { useSettings } from '@/composables/settings';
import { useSocket } from '@/composables/socket.io';
import { SocketEvent } from '@/utils/SocketEvents';
import AppLayout from '@/layout/AppLayout.vue';

const settings = useSettings()
const socket = useSocket()

const groceryStore = useGroceryStore()
const choreStore = useChoreStore()

onBeforeMount(() => {
  socket.init()
  settings.init();
  groceryStore.init(SocketEvent.GROCERY)
  choreStore.init(SocketEvent.CHORE)
})
</script>