<template>
  <div class="settings-container m-4">
    <div class="toggle-darkmode flex items-center">
      <Switch height="10" width="4" class="mr-4" :val="settings.darkMode" @toggle="settings.toggleDarkMode" />
      <span>{{ settings.darkMode ? 'Toggle light mode' : 'Toggle dark mode' }}</span>
    </div>
  </div>
</template>
<script setup>
import { useSettings } from '@/composables/settings';
import Switch from '@/components/ui/Switch.vue';
const settings = useSettings()

</script>
