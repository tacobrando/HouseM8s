<template>
  <div id="app" class="app-layout-container dark:bg-default dark:text-white">
    <nav id="navbar" v-if="isLoggedIn">
      <Navbar />
    </nav>
    <div class="content-container flex flex-col md:flex-row md:mb-0 mt-16 mb-16 md:h-[calc(100vh-4rem)] h-[calc(100vh-8rem)]">
      <Sidebar v-if="isLoggedIn" class="w-full md:w-[300px] md:flex-shrink-0" />
      <div class="flex-1 overflow-y-visible overflow-x-hidden dark:bg-default">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/composables/auth';
import { computed } from 'vue';

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
</script>