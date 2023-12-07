<template>
  <div>
    {{ router.currentRoute.value.params.username }}
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

console.log(router.currentRoute)
</script>