import { defineStore } from "pinia";
import api from '@/utils/Axios'
import { toast } from "./toast";
import { useChoreStore } from "./chore";
import { useGroceryStore } from "./grocery";

export const useGroupStore = defineStore('group', {
  state: () => ({
    groupName: '',
    currency: '',
    groupId: null,
    groupList: [
      // { id: 1, name: "Housemates"},
      // { id: 2, name: "Roomies"},
    ],
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
          toast.showSuccess(`${res.data.username} added to ${group.name}!`)
        })
      } catch(error) {
        console.log(error)
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
          }
          toast.showSuccess(res.data.message)
        });
      } catch (error) {
        toast.showError(error.message);
      }
    },    
    setGroup(id) {
      this.members = []
      if(this.groupId !== id) {
        useGroceryStore().getGroupItems(id)
        useChoreStore().getGroupItems(id)
        this.groupId = id

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