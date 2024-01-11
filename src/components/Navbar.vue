<template>
  <div class="dark:bg-[#282828] dark:text-white  navbar-container fixed flex items-center justify-center md:justify-between bottom-0 md:top-0 w-full bg-white text-black h-16 md:shadow-md shadow-top-md z-50">
    <router-link 
      :key="settings.darkMode"
      class="hidden md:block w-12 ml-4 h-12 rounded-full"
      to="/"
    >
      <img :src="currentIcon" alt="house">
    </router-link>
    <div class="flex md:flex-grow justify-center">
      <router-link 
        v-for="(item, index) in routes"
        :key="index"
        :to="item.path"     
        active-class="text-blue-500" 
        class="transition-all h-full flex items-center"
      >
        <div v-if="checkRoute(item)" class="w-auto h-full flex flex-col justify-center items-center mx-2 sm:mx-3 md:mx-6 mt-2">
          <font-awesome-icon :icon="['fas', getIcon(item)]" class="w-7 h-7" />
          <span>{{ item.name }}</span>
        </div>
      </router-link>
    </div>
    <div class="mr-4 flex-grow-0 hidden md:block w-10 h-10">
      <ProfileAvatar :img="avatar" tooltip />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSettings } from '@/composables/settings';
import { useUserStore } from '@/store/user';
import iconWhite from '@/assets/icons/HouseM8s-icon-white.png'
import iconBlack from '@/assets/icons/HouseM8s-icon-black.png'
import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'

const settings = useSettings()


const avatar = computed(() => useUserStore().userInfo.image)
const currentIcon = computed(() => settings.darkMode ? iconWhite : iconBlack);

const routes = useRouter().options.routes

function checkRoute(item) {
  return item.name !== 'Login' && item.name !== 'Error' && item.name !== 'Profile'
}

function getIcon(item) {
  if(item.name === 'Home') return 'home'
  else if(item.name === 'Chores') return 'broom'
  else if(item.name === 'Groceries') return 'cart-shopping'
  else if(item.name === 'Profile') return 'user'
  else if(item.name === 'Settings') return 'gear'
  else return 'circle'
}
</script>