import { defineStore } from "pinia";
import api from "@/utils/Axios";
import { toast } from "./toast";
import { router } from '@/router/router'

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
        toast.showError(error.response.data.message)
      } 
    },
    async getCookie() {
      await api.get('/users/get-cookie')
    }
  }
}) 