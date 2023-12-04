import { defineStore } from "pinia";
import api from "@/utils/Axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: 'Test',
    password: 'monkey'
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
      await api.post('/auth/login', this.$state)
      .then((res) => console.log(res.data))
    }
  }
})