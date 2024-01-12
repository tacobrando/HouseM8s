import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useChoreStore } from "./chore";
import { useGroceryStore } from "./grocery";
import { useSocket } from "@/composables/socket.io";
import { toast } from "@/composables/toast";
import { SocketEvent } from "@/utils/SocketEvents";
import api from '@/utils/Axios'


export const useGroupStore = defineStore('group', {
  state: () => ({
    groupName: '',
    currency: '',
    groupId: null,
    groupList: [],
    members: [],
  }),

  actions: {
    async getGroups() {
      try {
        await api.get('/groups/all')
        .then((res) => {
          for(const group of res.data) {
            group.id = group._id
            delete group._id
          }
          this.groupList = res.data
        })
      } catch(error) {
        console.error(error)
      }
    },
    async addGroup(group) {
      try {
        await api.post('/groups/add', group)
        .then((res) => {
          this.groupList.unshift(res.data)
        })
      } catch(error) {
        console.error(error)
      } 
    },
    async addUser(groupId, userId) {
      const group = this.groupList.find(group => group.id === groupId)
      try {
        await api.put(`/groups/${groupId}/add-user`, {
          memberId: userId
        }).then((res) => {
          group.members.push(res.data)
          this.members = group.members
          toast.showSuccess(`${res.data.username} added to ${group.name}!`)
        })
      } catch(error) {
        toast.showError(error.message)
      }
    },
    async removeUser(groupId, userId) {
      const group = this.groupList.find(group => group.id === groupId);
      try {
        await api.delete(`/groups/${groupId}/remove-user/${userId}`)
        .then((res) => {
          if (group) {
            group.members = group.members.filter(member => member.userId !== userId);
            this.members = group.members
          }
          toast.showSuccess(res.data.message)
        });
      } catch (error) {
        toast.showError(error.message);
      }
    },    
    setGroup(id) {
      const { socket } = useSocket()
      const { userInfo } = useUserStore()
      if(this.groupId !== id) {
        useGroceryStore().getGroupItems(id)
        useChoreStore().getGroupItems(id)
        this.groupId = id
        socket.emit(SocketEvent.JOIN_GROUP, { user: userInfo.username, groupId: this.groupId })
        const group = this.$state.groupList.find(group => group.id === id)
        this.groupName = group.name
        this.members = group.members
        this.currency = group.currency
        return;
      }
    },
    async updateGroupItem(groupId, item) {
      try {
        await api.put(`/groups/${groupId}/update`, item)
        .then((res) => toast.showSuccess(res.data.message))
      } catch(error) {
        toast.showError(error.message)
      }
    },
    updateGroupName(id, newName) {
      const group = this.$state.groupList.find(group => group.id === id)
      if(group) {
        group.name = newName
      }
    },
    async deleteGroup(groupId) {
      try {
        this.$state.groupList = this.$state.groupList.filter(group => group.id !== groupId);
        await api.delete(`/groups/${groupId}/delete`)
        .then((res) => {
          toast.showSuccess(res.data.message)
        })
      } catch(error) {
        toast.showError(error.message)
      }
      this.$state.groupId = null
    }
  }
})
