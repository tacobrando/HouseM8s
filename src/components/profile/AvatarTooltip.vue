<template>
  <Tooltip 
    :isOpen="isOpen" 
    @update:toggle="toggleTooltip.update"
  >
    <div class="grid grid-cols-3 p-1">
      <span v-for="image in images">
        <img 
          @click="setAvatar(image.name)"
          :src="image.url" 
          class="w-10 h-10 m-1 rounded-full cursor-pointer"
          :class="[ image.name === userStore.userInfo.image ? 'border-2 border-blue-500' : '' ]"
        >
      </span>      
    </div>
  </Tooltip>
</template>
<script setup>
import Tooltip from '@/components/ui/Tooltip.vue';
import { reactive } from 'vue';
import { useUserStore } from '@/store/user';

const { isOpen } = defineProps({
  isOpen: Boolean
})

const userStore = useUserStore() 

const imageModules = import.meta.glob('@/assets/img/profile/*.png', { eager: true });

const images = Object.keys(imageModules).map((path) => {
  const name = path.split('/').pop().replace('.png', '')
  return {
    name,
    url: imageModules[path].default
  };
});

const emit = defineEmits(['update:toggle'])

async function setAvatar(image) {
  try{
    await userStore.updateUser(userStore.userInfo.id, { image: image })
    userStore.userInfo.image = image
  } catch(error) {
    console.log(error)
  }
  emit('update:toggle', false)
}

const toggleTooltip = reactive({
  value: false,
  toggle() {
    toggleTooltip.value = !toggleTooltip.value
    if(toggleTooltip.value) {
      emit("update:toggle", false)
    }
  },
  update(value) {
    toggleTooltip.value = value
    emit("update:toggle", false)
  },
})
</script>