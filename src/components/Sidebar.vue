<template>
  <div 
    id="sidebar" 
    class="w-full"
  >
    <div class="fixed flex flex-col top-0 z-[45] w-full md:w-[300px] dark:text-white text-black md:mt-16">
      <div class="md:hidden flex flex-row items-center dark:bg-default bg-white z-30 shadow-[20px_0_20px_-5px_rgba(0,0,0,0.5)]"> 
        <div class="h-full flex items-center flex-col justify-center mt-5 ml-4 mr-2">
          <button 
            @click.stop="mobileMenu.toggle" 
            class="flex justify-center items-center transition-all"
            :class="{ 'text-blue-500': mobileMenu.value }"
          >
          <font-awesome-icon icon="fa-solid fa-bars" class="w-6 h-6" />
          </button>
          <div 
            class=" w-12 h-1 rounded-full mt-4 transition-all" 
            :class="[ mobileMenu.value ? 'bg-blue-500' : 'bg-white dark:bg-default']" 
          />
        </div>
        <div class="flex items-center justify-between flex-grow">
          <span class="sidebar-title font-semibold text-lg flex-shrink-0">
            {{ route.name }}
          </span>
          <ProfileAvatar tooltip class="w-10 h-10 mr-4" />
        </div>
      </div>
        <SidebarMenu @close="mobileMenu.set" :isOpen="mobileMenu.value" :store="groupStore" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useGroupStore } from '@/store/group';
import SidebarMenu from './SidebarMenu.vue';
import ProfileAvatar from './profile/ProfileAvatar.vue';

const route = useRoute()
const groupStore = useGroupStore()

const mobileMenu = reactive({
  value: false,
  toggle() {
    this.value = !this.value
  },
  set(bool) {
    mobileMenu.value = bool
  }
})
</script>