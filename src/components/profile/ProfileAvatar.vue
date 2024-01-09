<template>
  <div id="avatar-container">
    <div @click.stop="profileMenu.toggle">
      <img
        id="avatar-img"
        alt="avatar"
        class="rounded-full transition-all border h-full w-full"
        :class="[ mode === 'tooltip' ? 'hover:brightness-90 cursor-pointer' : '']"
        src="@/assets/img/avatar.png" 
        v-bind="$attrs" 
      />
    </div>
    <!-- <div @click="avatarUpload.toggle" class="relative inline-block rounded-full h-full w-full overflow-hidden group cursor-pointer">
      <img
        id="avatar-img" 
        alt="avatar"
        class="rounded-full cursor-pointer transition-all duration-300 ease-in-out border border-gray-300 h-full w-full"
        src="@/assets/img/avatar.png" 
        v-bind="$attrs"
      />
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 ease-in-out"/> -->
      <!-- <span class="
        text-center
        absolute 
        top-1/2 
        left-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2 
        text-white 
        text-md
        text-bold
        opacity-0 
        group-hover:opacity-100 
        transition-opacity 
        duration-300 
        ease-in-out 
        pointer-events-none"
      >
        Change Avatar
      </span> -->
    <!-- </div>     -->
    <ProfileTooltip @update:toggle="profileMenu.update" :isOpen="profileMenu.value" />
    <!-- <ProfileAvatarUpload @updateAvatar="updateAvatarImage" @update:isOpen="avatarUpload.update" :isOpen="avatarUpload.value" /> -->
  </div>
</template>

<script setup>
import ProfileTooltip from './ProfileTooltip.vue';
import { useUserStore } from '@/store/user';
import { ref, reactive, watch } from 'vue'
const props = defineProps({
  // src: {
  //   type: String,
  //   default: () => {
  //     return useUserStore().image
  //   },
  // },
  username: {
    type: String,
    default: () => useUserStore().userInfo.username,
  },
  showMenu: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
  }
})
const avatarUrl = ref([])

const profileMenu = reactive({
  value: false,
  toggle() {
    if(props.mode === 'tooltip') {
      profileMenu.value = !profileMenu.value
    }
  },
  update(value) {
    profileMenu.value = value
  } 
})

const avatarUpload = reactive({
  value: false,
  toggle() {
    avatarUpload.value = !avatarUpload.value
  },
  update(value) {
    avatarUpload.value = value
  }
})

// function navigateMenu() {
//   if(props.showMenu) {
//     profileMenu.toggle()
//   } else {
//     navigateTo(`/profile/${props.userId}`)
//   }
// }

function updateAvatarImage(url) {
  avatarUrl.value = [url]
}
const $attrs = ref({});
</script>

<style scoped>
#avatar-img  {
  object-fit: cover;
}
</style>