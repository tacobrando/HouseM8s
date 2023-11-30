<template>
  <div 
    id="sidebar" 
  >
    <div class="fixed flex top-0 z-30 w-full h-16 bg-white text-black shadow-md md:w-[300px] md:h-[calc(100vh-64px)] md:mt-16">
      <div class="sidebar-content hidden md:block">
        Content
      </div>
      <div class="md:hidden flex h-full mx-4 items-center transition-all z-30">
        <!-- <div class="w-8 h-8 bg-blue-500 rounded-full"></div> -->
        <div class="h-full flex items-center flex-col justify-center mt-5">
          <button 
          @click.stop="mobileMenu.toggle" 
          class="flex justify-center items-center mx-3"
          :class="{ 'text-blue-500': mobileMenu.value }"
        >
          <font-awesome-icon icon="fa-solid fa-bars" class="w-6 h-6" />
        </button>
        <div 
          class=" w-12 h-1 rounded-full mt-4" 
          :class="[ mobileMenu.value ? 'bg-blue-500' : 'bg-white']" 
        />
        </div>
      </div>
      <div class="sidebar-title flex justify-center items-center font-semibold text-lg">
        {{ route.name }}
      </div>
    </div>
    <SidebarMenu :isOpen="mobileMenu.value" @close="mobileMenu.set" />
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

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