import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { router } from '@/router/router'
import { registerSW } from 'virtual:pwa-register'
import { unregisterServiceWorker } from "@/utils/Helpers";
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
    async loginUser() {
      try {
        const { setUserInfo } = useUserStore()
        const { data } = await api.post('/auth/login', {
          username: this.username,
          password: this.password
        })
        setUserInfo(data.user)
        this.isLoggedIn = true
        toast.showSuccess(data.message)
        this.resetLoginInfo()
        registerSW()
        router.push('/')
      } catch(error) {
        this.isLoggedIn = false
        if (error.response) {
          toast.showError(error.response.data.message)
        } else {
          toast.showError(error.message)
        }
      }
    },
    async logoutUser() {
      try {
        const { resetInfo } = useUserStore()
        await api.get('/auth/logout')
        resetInfo('user')
        this.isLoggedIn = false
        unregisterServiceWorker()
        router.push('/login')
      } catch(error) {
        console.error(error)
      }
    },
    async isAuthenticated() {
      try {
        const { setUserInfo } = useUserStore()
        const response = await api.get('/auth/verify-session')
        if (response.data.verified) {
          setUserInfo(response.data.user)
          this.isLoggedIn = true
        } else {
          this.isLoggedIn = false
        }
      } catch (error) {
        this.isLoggedIn = false
      }
    }
  }
})