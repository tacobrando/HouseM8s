<template>
  <router-link v-if="username" :to="profilePath" class="flex font-medium">
    <p v-bind="$attrs">
      {{ username }}
    </p>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/user';

const { username } = defineProps({
  username: {
    type: String,
    default: () => useUserStore().userInfo.username
  }
});

const profilePath = computed(() => `/profile/${username}`)
</script>