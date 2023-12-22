<template>
  <div class="settings-container">
    <button @click="toggleDarkMode">Toggle Dark Mode</button>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useSettingsStore } from '@/composables/settings';
const { currency, toggleDarkMode } = useSettingsStore()

const currencySettings = computed(() => {
  return Object.entries(currency.options).map(([key, value]) => ({
    label: key,
    code: value
  }))
})

</script>
