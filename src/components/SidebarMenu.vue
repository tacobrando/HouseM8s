<template>
  <transition-group name="slide" tag="div">
    <div v-if="isOpen" id="sidebar-mobile-menu" class="fixed z-20 w-full text-black shadow md:hidden">      
      <ul class="flex flex-col bg-white rounded-b-xl mx-4 ">
        <li 
          v-for="num in 3"
          :key="num"
          class="w-full h-14 flex justify-center items-center border-b hover:text-blue-500 cursor-pointer"
          :class="[ num === 3 ? 'rounded-b-xl' : '']"
        >
          Options
        </li>
      </ul>
    </div> 
  </transition-group>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue';
const { isOpen } = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['close'])

function closeMenu(event){
  const mobileMenu = document.getElementById("sidebar-mobile-menu")
  if (mobileMenu && !mobileMenu.contains(event.target)) {
    emit('close', false)
  }
}

const clickOutsideEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

onMounted(() => {
  window.addEventListener(clickOutsideEvent, closeMenu);
});

onUnmounted(() => {
  window.removeEventListener(clickOutsideEvent, closeMenu);
});
</script>