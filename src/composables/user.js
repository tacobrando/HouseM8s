import { defineStore } from "pinia";
import api from "@/utils/Axios";
import { toast } from "./toast";
export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    username: '',
    email: '',
    groups: [],
    // token: '',
  }),
  actions: {
    setUserInfo(user) {
      for(const field in user) {
        if(field === '_id') {
          this.$state.id = user._id
        } else {
          this.$state[field] = user[field]
        }
      }
    },
    async registerUser(user) {
      try {
        await api.post('/users/register', {
          info: user
        })
        .then((res) => {
          if(res.data) {
            this.setUserInfo(res.data.user)
            toast.showSuccess(res.data.message)
          }
        })
      } catch(error) {   
        toast.showError(error.response.data.message)
      } 
    },
    async getCookie() {
      await api.get('/users/get-cookie')
    }
  }
}) 