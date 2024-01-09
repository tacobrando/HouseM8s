<template>
  <div class="profile-container m-4">
    {{ router.currentRoute.value.params.username }}
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>