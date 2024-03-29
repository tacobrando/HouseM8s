<template>
  <Modal :isOpen="isOpen" @update:isOpen="updateModal">
    <div class="member-search">
      <div class="border-b border-gray-200 dark:border-gray-600 w-full p-4">
        <h1 class="text-xl font-bold text-start">Search</h1>
        <p class="text-gray-500 text-sm">Add members to your group!</p>
      </div>
      <div class="member-search-input p-2">
        <input 
          v-model="searchQuery"
          placeholder="Search..."
          type="text" 
          class="bg-gray-100 dark:border-gray-600 dark:bg-default dark:text-white border py-1 px-2 rounded-md w-full" 
        />
      </div>
      <ul v-if="searchResults.length" class="max-h-[400px] overflow-auto p-2 member-search-results">
        <li v-for="result in searchResults" :key="result.id" class="member-search-results-item p-1 rounded-md dark:hover:bg-gray-700 hover:bg-gray-100">
          <div v-if="result.id" class="flex items-center justify-between my-2 mx-2">
            <span class="flex items-center">
              <ProfileAvatar :img="result.image" class="w-10 h-10 mr-2" />
              <p>{{ result.username }}</p>
            </span>
            <span class="flex items-center">
              <span v-if="isLoading[result.id]"  class="inline-block w-6 h-6 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></span>
              <button v-else class="rounded-md text-white flex items-center p-1" 
                :class="[ groupMembers.includes(result.id) ? 'bg-gray-200' : 'bg-blue-500' ]"
                @click="toggleUser(result.id)"
              >
                <font-awesome-icon :icon="groupMembers.includes(result.id) ? 'fa-solid fa-check' : 'fa-solid fa-plus'" class="w-5 h-5" />
              </button> 
            </span>
          </div>
          <span v-else class="my-2">
            {{ result.error }}
          </span>
        </li>
      </ul>
    </div>
  </Modal>
</template>
<script setup>
import { ref, watch, watchEffect } from 'vue';
import { useUserStore } from '@/store/user';
import { useGroupStore } from '@/store/group';
import Modal from '@/components/modal/modal.vue'
import ProfileAvatar from '@/components/profile/ProfileAvatar.vue';

const { isOpen, update, groupId } = defineProps({
  isOpen: Boolean,
  update: Function,
  groupId: String
})

const emit = defineEmits(['add', 'remove', 'update']);

const { getAllUsers, userInfo } = useUserStore()
const groupStore = useGroupStore()
 
const searchQuery = ref('');
const searchResults = ref([]);
const groupMembers = ref([]);
const isLoading = ref({});

watchEffect(() => {
  const currentGroup = groupStore.groupList.find(group => group.id === groupId);
  groupMembers.value = currentGroup ? currentGroup.members.map(member => member.userId) : [];
  if (searchQuery.value) {
    handleSearch();
  }
});

async function toggleUser(userId) {
  if (isLoading.value[userId]) {
    return; // To prevent calling again if already loading.
  }

  isLoading.value = { ...isLoading.value, [userId]: true };

  try {
    const index = groupMembers.value.indexOf(userId);
    if (index === -1) {
      await groupStore.addUser(groupId, userId);
      groupMembers.value.push(userId);
    } else {
      await groupStore.removeUser(groupId, userId);
      groupMembers.value.splice(index, 1);
    }

    isLoading.value = { ...isLoading.value, [userId]: false };
  } catch (error) {
    console.error(error);
    isLoading.value = { ...isLoading.value, [userId]: false };
  }
}

function updateModal() {
  searchQuery.value = ''
  emit("update", false)
}


async function handleSearch() {
  const users = await getAllUsers();

  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }
  const currentGroup = groupStore.groupList.find(group => group.id === groupId);
  const searchSegments = searchQuery.value.toLowerCase().split(' ').filter(segment => segment.length);

  let filteredResults = users.filter(user => {
    return user.id !== userInfo.id && 
    user.id !== currentGroup.owner &&
    searchSegments.some(segment => 
      user.username.toLowerCase().startsWith(segment)
    );
  });

  if (!filteredResults.length) {
    searchResults.value = [{ error: "No results found" }];
  } else {
    searchResults.value = filteredResults;
  }
}

watch(searchQuery, (newVal) => {
  if (newVal) {
      handleSearch();
  } else {
      searchResults.value = []
  }
});
</script>
<style scoped>
@import url('@/assets/css/animations.css');
</style>