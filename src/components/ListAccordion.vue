<template>
  <div class="list-container w-full lg:mr-2 bg-inherit overflow-hidden">
    <div class="bg-inherit w-full z-10 relative flex flex-col rounded-b-lg">
      <span 
        id="list-panel"
        class="text-lg w-full font-bold flex items-center justify-between border border-gray-500 rounded-md bg-inherit cursor-pointer p-2" 
        @click="showList.toggle()"
      >
        {{ name }} <font-awesome-icon :icon="['fas', show[showId] ? 'chevron-up' : 'chevron-down']" />
      </span>
      <span v-if="length <= 0" class="text-center text-gray-400 my-4">
        No tasks! 😱
      </span>
    </div>
    <transition-group 
      name="slide" 
      tag="div"
    >
      <div v-if="show[showId]" class="list-item-task">
          <slot />
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const { show, name, length } = defineProps({
  show: Object,
  name: String,
  length: Number,
  groupId: String,
})

const showId = name.toLowerCase()

const showList = reactive({
  toggle() {
    show[showId] = !show[showId]
  }
})

</script>