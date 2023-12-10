<template>
  <Tooltip @update:toggle="logoutConfirm.update" :isOpen="isOpen" class="w-full md:w-[400px] right-0 md:right-4 top-[3.45rem] ">
    <div @click="navigate" class="p-1 cursor-pointer mb-2 border flex items-center justify-start rounded-lg shadow-md">
      <span class="flex hover:bg-gray-100 transition-colors w-full p-3 rounded-md items-center">
        <ProfileAvatar class="w-10 h-10" />
        <ProfileName :username="user.userInfo.username" class="mx-2 text-black" />
      </span>
    </div>
    <button
      @click="logoutConfirm.toggle"
      iconSize="6"
      icon="right-from-bracket"
      class="w-full flex p-3 hover:bg-gray-100"
    >
      <p>Log out</p>
    </button>
  </Tooltip>
    <Modal :hideBtn="true" :isOpen="logoutConfirm.value" @update:isOpen="logoutConfirm.update">
      <div class="p-6 text-center text-black">
        <p class="text-lg">Are you sure you want to logout?</p>
        <div class="flex justify-evenly space-x-4 mt-4">
          <button class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600" @click="logoutConfirm.logout">Logout</button>
          <button class="px-4 py-2 rounded-md text-gray-700 bg-white border hover:bg-gray-100" @click="logoutConfirm.update(false)">Cancel</button>
        </div>
      </div>
    </Modal>
</template>

<script setup>
import Tooltip from '@/components/Tooltip.vue'
import ProfileName from './ProfileName.vue';
import ProfileAvatar from './ProfileAvatar.vue';
import { useUserStore } from '@/composables/user';
import { useAuthStore } from '@/composables/auth';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '../modal/Modal.vue';

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
  router.push(`/profile/${user.userInfo.username}`)
  emit("update:toggle", false)
}
</script>