<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useChoreStore } from '@/store/chore';
import { useGroceryStore } from '@/store/grocery';
import { usePwa } from '@/composables/pwa'
import { useSettings } from '@/composables/settings';
import { useSocket } from '@/composables/socket.io';
import { SocketEvent } from '@/utils/SocketEvents';
import AppLayout from '@/layout/AppLayout.vue';
import InstallPrompt from './components/InstallPrompt.vue';


const settings = useSettings()
const socket = useSocket()

const groceryStore = useGroceryStore()
const choreStore = useChoreStore()

const pwa = usePwa();

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    pwa.deferredPrompt = e;
    pwa.showInstallPrompt(InstallPrompt);
  });
  window.addEventListener('appinstalled', () => {
    pwaStore.handleAppInstalled();
  });
});

onBeforeMount(() => {
  socket.init()
  settings.init();
  groceryStore.init(SocketEvent.GROCERY)
  choreStore.init(SocketEvent.CHORE)
})
</script>