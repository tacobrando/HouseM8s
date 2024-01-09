<template>
  <div class="switch-container">
    <label for="toggle" class="flex items-center cursor-pointer">
      <div class="relative">
        <input id="toggle" type="checkbox" class="sr-only" v-model="isToggled" @change="emitToggle" />
        <div class="block dark:bg-white bg-gray-600 w-14 h-8 rounded-full"></div>
        <div 
          class="dot absolute top-1 dark:bg-gray-600 bg-white w-6 h-6 rounded-full transition"
          :class="[ val ? 'left-[5px]' : 'left-1' ]"
        />
      </div>
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const { val } = defineProps({
  val: Boolean
})
const emit = defineEmits(['toggle'])

const isToggled = ref(val)

watch(() => val, (newValue) => {
  isToggled.value = newValue
})

function emitToggle() {
  emit('toggle', isToggled.value)
}
</script>

<style scoped>
.dot {
  transform: translateX(0px);
  transition: transform 0.2s ease-in-out;
}
input:checked ~ .dot {
  transform: translateX(24px);
}
</style>
