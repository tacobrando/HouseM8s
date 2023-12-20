<template>
  <button 
    @click="toggleCheck"
    :disabled="disabled"
    class="h-7 w-7 shadow-inner transition-all border border-gray-200 rounded-full mr-3 select-none" 
    :class="[completed && !disabled ? 'bg-pink-400' : 'bg-gray-200']"
    >
    <font-awesome-icon 
      icon="fa-solid fa-check" 
      class="transition-all" 
      :class="[completed && disabled ? 'text-white':'text-gray-200']"
    />
</button>
</template>
<script setup>
const { completed, disabled } = defineProps(['completed', 'disabled'])
const emit = defineEmits(['toggle'])

function toggleCheck() {
  emit('toggle')
}
</script>