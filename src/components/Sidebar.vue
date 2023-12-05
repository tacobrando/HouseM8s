<template>
  <div 
    id="sidebar" 
  >
    <div class="fixed flex flex-col top-0 z-[45] md:w-[300px] text-black md:mt-16"> <!--w-full shadow-md h-16-->
      <div class="md:hidden flex flex-row w-screen items-center bg-white z-30 shadow-md">
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
          :class="[ mobileMenu.value ? 'bg-blue-500' : 'bg-white']" 
        />
        </div>
        <div class="sidebar-title font-semibold text-lg">
          {{ route.name }}
        </div>
      </div>
      <SidebarMenu @close="mobileMenu.set" :isOpen="mobileMenu.value" :store="groupStore" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useGroupStore } from '@/composables/group';
import SidebarMenu from './SidebarMenu.vue';

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