<template>
  <div class="list-container w-full lg:mr-2 bg-inherit z-30">
    <div class="bg-inherit w-full z-10 relative rounded-b-lg">
      <span 
        id="list-panel"
        class="text-lg font-bold flex items-center justify-between border border-gray-500 rounded-md bg-inherit cursor-pointer p-2 z-10 relative" 
        @click="showList.toggle()"
      >
        {{ name }} <font-awesome-icon :icon="['fas', show[showId] ? 'chevron-up' : 'chevron-down']" />
      </span>
    </div>
    <span v-if="length <= 0" class="text-start text-gray-400 my-4">
      No items! 😱
    </span>
    <transition-group name="slide" tag="div">
      <div v-if="show[showId]" class="relative z-0">
        <transition-group name="slide-down" tag="div" class="list">
          <slot />
        </transition-group>
      </div>
    </transition-group>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const { show, name, length } = defineProps({
  show: Object,
  name: String,
  length: Number
})

const showId = name.toLowerCase()

const showList = reactive({
  toggle() {
    show[showId] = !show[showId]
  }
})
</script>