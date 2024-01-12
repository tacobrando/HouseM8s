import { defineStore } from "pinia";
import { router } from '@/router/router'
import { toast } from "@/composables/toast";
import api from "@/utils/Axios";
import { useGroupStore } from "./group";

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: '',
      username: '',
      email: '',
      groups: [],
      createdAt: '',
      updatedAt: ''
    },
    registerInfo: {
      username: '', 
      email: '',
      password: '',
      confirmPassword: ''
    }
  }),
  actions: {
    async getUser(userId) {
      try {
        const { data } = await api.get(`/users/user/${userId}`)
        if(data) {
          return data
        }
      } catch(error) {
        toast.showError(error.message)
      }
    },
    async updateUser(userId, item, showMsg = true) {
      try {
        const { data } = await api.put(`/users/user/${userId}`, item)
        if(data) {
          if(showMsg) {
            toast.showSuccess(data.message)
          }
          return data
        }
      } catch(error) {
        toast.showError(error.response.data.message)
      }
    },
    updateAvatars(userId, image) {
      const groupStore = useGroupStore()
      const user = groupStore.members.find(member => member.userId === userId)
      this.userInfo.image = image
      user.image = image
      groupStore.groupList.forEach(group => {
        const member = group.members.find(member => member.userId === userId)
        member.image = image
      })
    },
    async getAllUsers() {
      try {
        const { data } = await api.get('/users/all')
        if(data) {
          return data
        }
      } catch(error) {
        toast.showError(error.message)
      }
    },
    setUserInfo(user) {
      for(const field in user) {
        if(field === '_id') this.$state.userInfo.id = user._id
        else this.$state.userInfo[field] = user[field]
      }
    },
    resetInfo(option) {
      let info;
      if(option === 'register') info = this.$state.registerInfo
      else if (option === 'user') info = this.$state.userInfo

      for(const field in info) {
        if(field === 'groups') info[field].groups = []
        else info[field] = ''
      }
    },
    async registerUser() {
      try {
        await api.post('/users/register', {
          info: this.$state.registerInfo
        })
        .then((res) => {
          if(res.data) {
            this.setUserInfo(res.data.user)
            toast.showSuccess(res.data.message)
          }
        })
        this.resetInfo('register')
        router.push('/')
      } catch(error) {   
        if(error.response) {
          toast.showError(error.response.data.message)
        } else {
          toast.showError(error.message)
        }
      } 
    },
    // async getCookie() {
    //   await api.get('/users/get-cookie')
    // }
  }
}) 