<template>
  <Modal :isOpen="isOpen" @update:isOpen="updateModal">
    <div class="edit-group">
      <div class="border-b border-gray-200 dark:border-gray-600 w-full p-4">
        <h1 class="text-xl font-bold text-start">Edit Group</h1>
        <p class="text-gray-500 text-sm">Edit group information.</p>
      </div>
      <div class="edit-group-options p-2">
        <label class="mr-2 ml-2" for="select">Currency:</label>
        <select 
          class="bg-white text-black border-2" 
          @change="(event) => groupSettings.setCurrency(group.id, event)"
          v-model="group.currency"
        >
          <option 
            v-for="option in currencySettings" 
            :key="option.code" 
            :value="option.code"
            selected="$"
          >
          {{ option.code }} {{ option.label }}
          </option>
        </select>
        <ul class="max-h-[400px] overflow-auto p-2 edit-group-members">
          <li v-for="member in group.members" :key="member.userId" class="member-search-results-item p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <div v-if="member.userId" class="flex items-center justify-between my-2 mx-2">
              <span class="flex items-center w-full">
                <ProfileAvatar class="w-10 h-10" />
                <div class="flex justify-between w-full items-center">
                  <p class="mx-2">{{ member.username }}</p>
                  <p class="text-gray-400 text-sm" v-if="group.owner === member.userId">Owner</p>
                </div>
              </span>
              <span class="flex items-center" v-if="member.userId !== group.owner">
                <span 
                  v-if="isLoading[member.userId]"  
                  class="inline-block w-6 h-6 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" 
                />
                <button
                  v-else
                  v-if="group.owner === member.userId"
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
import { ref, computed, reactive } from 'vue';
import { useGroupStore } from '@/store/group';
import { useSettings } from '@/composables/settings';
import Modal from '@/components/modal/modal.vue'
import ProfileAvatar from '@/components/profile/ProfileAvatar.vue';


const emit = defineEmits(['update', 'remove'])
const { isOpen, group } = defineProps({
  isOpen: Boolean,
  group: Object
}) 

const groupStore = useGroupStore()
const isLoading = ref({});

const settings = useSettings()

const currencySettings = computed(() => {
  return Object.entries(settings.currency.options).map(([key, value]) => ({
    label: key,
    code: value
  }))
})

const groupSettings = reactive({
  async setCurrency(groupId, event) {
    if(groupStore.groupId === groupId) {
      groupStore.currency = event.target.value
    }
    await groupStore.updateGroupItem(groupId, { currency: event.target.value })
  }
})

function updateModal() {
  emit("update", false)
}

async function removeUserHandler(groupId, userId) {
  if (isLoading.value[userId]) {
    return;
  }

  isLoading.value = { ...isLoading.value, [userId]: true };

  try {
    await groupStore.removeUser(groupId, userId);
    isLoading.value = { ...isLoading.value, [userId]: false };
  } catch (error) {
    console.error(error);
    isLoading.value = { ...isLoading.value, [userId]: false };
  }
}
</script>