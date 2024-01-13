<template>
  <AppLayout>
    <router-view />
    <button v-if="showInstallPrompt" @click="promptInstall">
      Install App
    </button>
  </AppLayout>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
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

const showInstallPrompt = ref(false);
let deferredPrompt;

onBeforeMount(() => {
  socket.init()
  settings.init();
  groceryStore.init(SocketEvent.GROCERY)
  choreStore.init(SocketEvent.CHORE)

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt.value = true;
  });
})

async function promptInstall() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  console.log(`User response to the install prompt: ${outcome}`);
  
  deferredPrompt = null;
  showInstallPrompt.value = false;
};
</script>