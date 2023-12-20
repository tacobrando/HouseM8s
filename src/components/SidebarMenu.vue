<template>
  <div 
    :class="{
      'transform translate-x-0 pointer-events-auto z-20': isOpen, 
      '-translate-x-full': !isOpen,
      'fixed inset-y-0 left-0 w-[300px] transition-transform duration-200': true,
      'flex flex-col': true
    }" 
    id="sidebar-menu"
    class="sidebar-content w-full 2xs:w-[300px] shadow-md mt-[64px] md:mt-0 md:h-[calc(100vh-64px)] h-[calc(100vh-128px)] bg-white px-4 pt-4 md:static md:translate-x-0"
  >
    <div class="font-bold text-xl flex items-center justify-between">
      <span>
        Groups
      </span>
    </div>
    <div class="my-4">
      <Input placeholder="Add group" name="group" type="text" maxlength="20" class="text-white" @add="addGroup" />
    </div>
    <transition-group name="slide-down" tag="div" class="group-list flex flex-col mt-4 overflow-y-auto overflow-x-hidden">
      <div 
        v-for="group in store.groupList" 
        :key="group.id"
        class="transition-colors first:z-50 first:border-t-2 border-b-2 p-3 border-x-0 bg-white cursor-pointer"
      >
        <div 
          :class="[group.id === store.groupId ? 'text-blue-500' : '']"
          class="flex justify-between" 
          
          @click="setGroup(group.id, group)"
        >
          <p class="mx-2">  
            {{ group.name }}
          </p>
          <button @click.stop="editMenu.toggle(group.id)" class="text-black">
            <font-awesome-icon icon="fa-solid fa-ellipsis" />
          </button>
        </div>
        <Tooltip @update:toggle="editMenu.toggle" class="right-4 text-black p-3 flex flex-col items-start" :isOpen="editMenu.groupId === group.id">
          <button class="hover:text-blue-500" @click="memberModal.toggle(group.id)">Add</button>
          <button class="hover:text-blue-500" @click="editModal.toggle(group)">Edit</button>
          <button 
            v-if="group.owner === userStore.userInfo.id" 
            @click="deleteModal.toggle(group.id, group.name)"
            class="hover:text-blue-500">
              Delete
          </button>
        </Tooltip>
      </div>
    </transition-group>
    <MemberSearchModal
      :key="memberModal.groupId"
      :groupId="memberModal.groupId"
      :isOpen="memberModal.value"
      @update="memberModal.update"
    />
    <EditGroupModal
      :group="editModal.group"
      :isOpen="editModal.value"
      @update="editModal.update"
    />
    <DeleteGroupModal
      prompt="Delete"
      :isOpen="deleteModal.value"
      :name="deleteModal.name"
      :func="deleteModal.delete"
      @update="deleteModal.update"
    />
  </div>
</template>
<script setup>
import Input from './Input.vue'
import { onMounted, onUnmounted, reactive } from 'vue';
import Tooltip from './Tooltip.vue';
import { useUserStore } from "@/composables/user"
import MemberSearchModal from './modal/search/members/MemberSearchModal.vue';
import EditGroupModal from './modal/edit/EditGroupModal.vue';
import DeleteGroupModal from './modal/delete/DeleteGroupModal.vue';

const { store, isOpen } = defineProps({
  store: Object,
  isOpen: Boolean
})
const emit = defineEmits(['close'])
const userStore = useUserStore()

async function addGroup(group) {
  await store.addGroup({
    owner: userStore.userInfo.id,
    name: group.item,
    members: [{
      userId: userStore.userInfo.id,
      username: userStore.userInfo.username,
      joined: new Date()
    }]
  })
}

function setGroupIdLocal(ref, groupId, bool) {
  if(bool) {
    ref.groupId = groupId
  } else {
    ref.groupId = null
  }
}

const deleteModal = reactive({
  value: false,
  groupId: null,
  name: '',
  toggle(groupId, name) {
    editMenu.toggle()
    deleteModal.value = !deleteModal.value
    deleteModal.name = name
    setGroupIdLocal(deleteModal, groupId, deleteModal.value)
  },
  update(value) {
    deleteModal.value = value
  },
  async delete() {
    await store.deleteGroup(deleteModal.groupId)
    deleteModal.value = !deleteModal.value
  }
})

const memberModal = reactive({
  value: false,
  groupId: null,
  toggle(groupId) {
    editMenu.toggle()
    memberModal.value = !memberModal.value
    setGroupIdLocal(memberModal, groupId, memberModal.value)
  },
  update(value) {
    memberModal.value = value
  },
})

const editModal = reactive({
  value: false,
  group: null,
  toggle(group) {
    editMenu.toggle()
    editModal.value = !editModal.value
    if(editModal.value) {
      editModal.group = group
    } else {
      editModal.group = null
    }
  },
  update(value) {
    editModal.value = value
  }
})

const editMenu = reactive({
  value: false,
  groupId: null,
  toggle(groupId) {
    if(editMenu.groupId === groupId) {
      editMenu.groupId = null
    } else {
      editMenu.groupId = groupId
    }
    editMenu.value = !editMenu.value
  },
  update(value) {
    editMenu.value = value
  }
})

function setGroup(id) {
  store.setGroup(id)
  emit('close', false)
}

function closeMenu(event){
  const menu = document.getElementById("sidebar-menu")
  if (menu && !menu.contains(event.target)) {
    emit('close', false)
  }
}

onMounted(async () => {
  await store.getGroups()
  document.addEventListener('click', closeMenu);
});
onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
});
</script>