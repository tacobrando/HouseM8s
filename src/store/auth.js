import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { router } from '@/router/router'

import api from "@/utils/Axios";
import { toast } from "@/composables/toast";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    password: '',
    isLoggedIn: false
  }),

  actions: {
    resetLoginInfo() {
      this.username = ''
      this.password = ''
    },
    async loginUser(showMsg=true) {
      try {
        const { setUserInfo, userInfo } = useUserStore()
        const { data } = await api.post('/auth/login', {
          username: this.username,
          password: this.password
        })
        if(userInfo.id === '') {
          setUserInfo(data.user)
        }
        this.$state.isLoggedIn = true
        if(showMsg) {
          toast.showSuccess(data.message)
        }
        router.push('/')
        this.resetLoginInfo()
      } catch(error) {
        if(error.response) {
          toast.showError(error.response.data.message)
        } else {
          toast.showError(error.message)
        }
        this.$state.isLoggedIn = false;
      }
    },
    async logoutUser() {
      try {
        const { resetInfo } = useUserStore()
        await api.get('/auth/logout')
        .then(() => resetInfo('user'))
        this.$state.isLoggedIn = false
        router.push('/login')
      } catch(error) {
        console.error(error)
      }
    },
    async isAuthenticated() {
      try {
        const response = await api.get('/auth/verify-token');
        if(response.data.verified) {
          const { setUserInfo } = useUserStore()
          setUserInfo(response.data.user)
        }
        this.$state.isLoggedIn = response.data.verified;
        return response.data.verified;
      } catch (error) {
        this.$state.isLoggedIn = false;
        return false;
      }
    }
  }
})