<template>
  <div class="settings-container">
    <button @click="toggleDarkMode">Toggle Dark Mode</button>
  </div>
</template>
<script setup>
import { useSettingsStore } from '@/composables/settings';
const { toggleDarkMode } = useSettingsStore()
</script>
