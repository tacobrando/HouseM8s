import { defineStore } from "pinia";
import api from '@/utils/Axios'

export const useGroupStore = defineStore('group', {
  state: () => ({
    groupId: 1,
    groupList: [
      { id: 1, name: "Housemates" },
      { id: 2, name: "Roomies" },
    ],
    members: [],
  }),

  actions: {
    async addGroup(group) {
      try {
        this.groupList.unshift(group)
        await api.post('/groups/add', group)
      } catch(error) {
        console.error(error)
      }
      
    },
    setGroup(id) {
      this.groupId = id
    }
  }
})
