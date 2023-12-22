<template>
  <div 
    v-if="isOpen" 
    v-bind="$attrs" 
    class="
      tooltip-menu
      cursor-auto 
      absolute 
      w-auto
      h-fit
      dark:bg-default 
      bg-white 
      border
      dark:text-white
      dark:border-gray-700
      rounded-lg
    ">
    <slot />
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const { isOpen } = defineProps({
  isOpen: Boolean,
})
const emit = defineEmits()
const $attrs = ref({});

const handleOutsideClick = (event) => {
  event.stopPropagation();
  if (!event.target.closest('.tooltip-menu')) {
    emit("update:toggle", false);
  }
};
onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>