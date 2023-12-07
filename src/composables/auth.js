import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { router } from '@/router/router'

import api from "@/utils/Axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: 'Test',
    password: 'monkey',
    isLoggedIn: false
  }),

  actions: {
    // setLoginInfo(info) {
    //   this.username = info.username
    //   this.password = info.password
    // },
    resetLoginInfo() {
      this.username = ''
      this.password = ''
    },
    async loginUser() {
      try {
        const { setUserInfo } = useUserStore()
        await api.post('/auth/login', this.$state)
        .then((res) => setUserInfo(res.data.user))
        this.$state.isLoggedIn = true
        router.push('/')
      } catch(error) {
        console.error(error);
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