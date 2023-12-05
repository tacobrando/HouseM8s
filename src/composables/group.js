import { defineStore } from "pinia";
import api from '@/utils/Axios'

export const useGroupStore = defineStore('group', {
  state: () => ({
    groupId: null,
    groupList: [
      { id: 1, name: "Housemates" },
      { id: 2, name: "Roomies" },
    ],
    members: [],
  }),

  actions: {
    async addGroup(group) {
      try {
        await api.post('/groups/add', group)
        .then((res) => {
          console.log(res.data)
        })
        this.groupList.unshift(group)
      } catch(error) {
        console.error(error)
      }
      
    },
    setGroup(id) {
      this.groupId = id
    }
  }
})
