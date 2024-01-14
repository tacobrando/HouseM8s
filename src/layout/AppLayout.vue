<template>
  <div id="app" class="app-layout-container dark:bg-default dark:text-white">
    <nav id="navbar" v-if="isLoggedIn">
      <Navbar />
    </nav>
    <div 
      class="content-container flex flex-col md:flex-row md:mb-0"
      :class="[ route.name === 'Login' ? 'mt-0 h-screen' : 'mt-16 md:mb-16 mb-20 md:h-[calc(100dvh-4rem)] h-[calc(100dvh-9rem)]' ]"
    >
      <Sidebar v-if="isLoggedIn" class="w-full md:w-[300px] md:flex-shrink-0" />
      <div class="flex-1 overflow-y-scroll overflow-x-hidden dark:bg-default">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';

const route = useRoute()


const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
</script>