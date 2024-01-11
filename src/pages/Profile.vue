<template>
  <div class="profile-container m-4">
    <div class="avatar flex flex-col justify-center">
      <span class="flex items-center mb-2">
        <ProfileAvatar :img="avatar" class="w-20 h-20 mr-4" />
        <ProfileName />
      </span>
      <button 
        @click.stop="avatarOptions.toggle"
        class="transition-all w-fit bg-blue-500 p-1.5 rounded-md hover:brightness-75"
      >
        Change avatar
      </button>
    </div>
    <AvatarTooltip :isOpen="avatarOptions.value" @update:toggle="avatarOptions.update" />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useUserStore } from '../store/user';
import ProfileName from '../components/profile/ProfileName.vue';
import ProfileAvatar from '../components/profile/ProfileAvatar.vue';
import AvatarTooltip from '../components/profile/AvatarTooltip.vue';

const avatar = computed(() => useUserStore().userInfo.image)

const avatarOptions = reactive({
  value: false,
  toggle() {
    avatarOptions.value = !avatarOptions.value
  },
  update(value) {
    avatarOptions.value = value
  }
})
</script>