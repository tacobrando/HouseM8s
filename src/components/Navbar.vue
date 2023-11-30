<template>
  <div class="navbar-container fixed flex items-center justify-center bottom-0 md:top-0 w-full bg-white text-black h-16 shadow-md z-50">
    <router-link 
      v-for="(item, index) in routes"
      :key="index"
      :to="item.path" 
      active-class="text-blue-500" 
      class="transition-all h-full flex items-center"
    >
      <div class="w-auto h-full flex flex-col justify-center items-center mt-4 mx-6">
        <font-awesome-icon :icon="['fas', getIcon(item)]" class="w-8 h-8" />
        <div 
          class=" w-12 h-1 rounded-full mt-3" 
          :class="[route.path === item.path ? 'bg-blue-500' : 'bg-white']" 
        />
      </div>
    </router-link>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const routes = router.getRoutes()

function getIcon(item) {
  if(item.name === 'Home') return 'home'
  else if(item.name === 'Chores') return 'broom'
  else if(item.name === 'Groceries') return 'cart-shopping'
  else return 'user'
}

</script>