<template>
  <div id="app" class="app-layout-container overflow-y-auto">
    <nav id="navbar" v-if="isLoggedIn">
      <Navbar />
    </nav>
    <div class="content-container flex flex-col md:flex-row md:mb-0 mt-16 mb-16">
      <Sidebar v-if="isLoggedIn" class="w-full md:w-[300px] md:flex-shrink-0" />
      <div class="flex-1 overflow-hidden">
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