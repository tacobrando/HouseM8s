<template>
  <transition-group name="slide" tag="div">
    <div v-if="isOpen" id="sidebar-mobile-menu" class="fixed z-[44] w-full text-black">      
      <ul class="flex flex-col bg-white rounded-b-xl mx-4 shadow md:hidden">
        <li 
          v-for="group in groupStore.groupList"
          :key="group.id"
          class="w-full h-14 flex justify-center items-center border-b hover:text-blue-500 cursor-pointer last:rounded-b-xl"
          @click="setGroup(group.id)"
        >
          {{ group.name }}
        </li>
      </ul>
    </div> 
  </transition-group>
</template>
<script setup>
import { useGroupStore } from '@/composables/group';
import { onMounted, onUnmounted } from 'vue';
const { isOpen } = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
const groupStore = useGroupStore()

const emit = defineEmits(['close'])

function closeMenu(event){
  const mobileMenu = document.getElementById("sidebar-mobile-menu")
  if (mobileMenu && !mobileMenu.contains(event.target)) {
    emit('close', false)
  }
}

function setGroup(id) {
  groupStore.setGroup(id)
  emit('close', false)
}

onMounted(() => {
  document.addEventListener('click', closeMenu);
});
onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
});
</script>