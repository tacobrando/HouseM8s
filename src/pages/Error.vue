<template>
  <div class="error-page">
    Not Found. Redirecting in: {{ secondsLeft }} seconds.
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const router = useRouter();

const secondsLeft = ref(3); 

onMounted(() => {
  const interval = setInterval(() => {
    secondsLeft.value--;
    if (secondsLeft.value === 0) {
      clearInterval(interval);
      if (authStore.isLoggedIn) {
        router.push('/');
      } else {
        router.push('/login');
      }
    }
  }, 1000);
});
</script>
