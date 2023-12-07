<template>
  <router-link v-if="username" :to="profilePath" class="flex font-medium">
    <p v-bind="$attrs">
      {{ username }}
    </p>
  </router-link>
</template>

<script setup>
import { useUserStore } from '@/composables/user';
import { computed } from 'vue';
const { username } = defineProps({
  username: {
    type: String,
    default: () => useUserStore().userInfo.username
  }
});

const profilePath = computed(() => `/profile/${username}`)
</script>