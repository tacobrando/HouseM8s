<template>
  <Modal :isOpen="isOpen" @update:isOpen="updateModal">
    <div class="edit-group">
      <div class="border-b border-gray-200 w-full p-4">
        <h1 class="text-xl font-bold text-start">Edit Group</h1>
        <p class="text-gray-500 text-sm">Edit group information.</p>
      </div>
      <div class="edit-group-options p-2">
        <ul class="max-h-[400px] overflow-auto p-2 edit-group-members">
          <li v-for="member in group.members" :key="member.userId" class="member-search-results-item p-1 rounded-md hover:bg-gray-100">
            <div v-if="member.userId" class="flex items-center justify-between my-2 mx-2">
              <span class="flex items-center">
                <ProfileAvatar class="w-10 h-10 mr-2" />
                <p>{{ member.username }}</p>
                <p v-if="group.owner === member.userId">Owner</p>
              </span>
              <span class="flex items-center" v-if="member.userId !== group.owner && member.userId !== userInfo.id">
                <span 
                  v-if="isLoading[member.userId]"  
                  class="inline-block w-6 h-6 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" 
                />
                <button 
                  v-else
                  @click="removeUserHandler(group.id, member.userId)"
                  class="rounded-md text-white flex items-center p-1 bg-red-500" 
                >
                  <font-awesome-icon icon="fa-solid fa-trash" class="w-5 h-5" />
                </button>              
              </span>
            </div>
            <span v-else class="my-2">
              No members in group.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import Modal from '@/components/modal/modal.vue'
import ProfileAvatar from '@/components/profile/ProfileAvatar.vue';
import { useUserStore } from '@/composables/user';
import { useGroupStore } from '@/composables/group';
import { ref } from 'vue'

const emit = defineEmits(['update', 'remove'])
const { isOpen, group } = defineProps({
  isOpen: Boolean,
  group: Object
}) 

const { userInfo } = useUserStore()
const { removeUser } = useGroupStore()
const isLoading = ref({});

function updateModal() {
  emit("update", false)
}

async function removeUserHandler(groupId, userId) {
  if (isLoading.value[userId]) {
    return;
  }

  isLoading.value = { ...isLoading.value, [userId]: true };

  try {
    await removeUser(groupId, userId);
    isLoading.value = { ...isLoading.value, [userId]: false };
  } catch (error) {
    console.error(error);
    isLoading.value = { ...isLoading.value, [userId]: false };
  }
}
</script>