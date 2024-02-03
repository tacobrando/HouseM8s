<template>
  <Tooltip @update:toggle="logoutConfirm.update" :isOpen="isOpen" class="w-full md:w-[400px] right-0 md:right-4 top-[3.45rem] p-3">
    <div @click="navigate" class="p-1 cursor-pointer mb-2 dark:border-gray-700 border flex items-center justify-start rounded-lg shadow-md">
      <span class="flex hover:bg-gray-100 dark:hover:bg-gray-600 transition-all w-full p-3 rounded-md items-center">
        <ProfileAvatar :img="user.userInfo.image" mode="tooltip" class="w-10 h-10" />
        <ProfileName :username="user.userInfo.username" class="mx-2 dark:text-white text-black" />
      </span>
    </div>
    <button
      @click="logoutConfirm.toggle"
      class="w-full flex p-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md items-center"
    >
      <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="w-6 h-6 mr-2" />
      <p>Log out</p>
    </button>
  </Tooltip>
  <LogoutModal :isOpen="logoutConfirm.value" :update="logoutConfirm.update" :logout="logoutConfirm.logout" />
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useAuthStore } from '@/store/auth';
import Tooltip from '@/components/ui/Tooltip.vue'
import ProfileName from './ProfileName.vue';
import ProfileAvatar from './ProfileAvatar.vue';
import LogoutModal from '@/components/modal/logout/LogoutModal.vue';

const { isOpen } = defineProps(['isOpen'])

const user = useUserStore()
const auth = useAuthStore()
const router = useRouter()

const emit = defineEmits()

const logoutConfirm = reactive({
  value: false,
  toggle() {
    logoutConfirm.value = !logoutConfirm.value
    if(logoutConfirm.value) {
      emit("update:toggle", false)
    }
  },
  update(value) {
    logoutConfirm.value = value
    emit("update:toggle", false)
  },
  logout(value) {
    if(value) {
      auth.logoutUser()
      emit("update:toggle", false)
    }
    logoutConfirm.value = !value
  }
})

function navigate() {
  router.push(`/profile`)
  emit("update:toggle", false)
}
</script>