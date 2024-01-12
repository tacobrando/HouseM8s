import { io } from 'socket.io-client'
import { defineStore } from 'pinia'
import { API_URL } from '@/utils/Constants'

export const useSocket = defineStore('socket', {
  state: () => ({
    socket: null,
    isConnected: false
  }),
  actions: {
    init() {
      this.socket = io(API_URL)
      this.socket.on('connected', () => {
        this.isConnected = true
      })
      this.socket.off()
      this.socket.on('disconnect', () => {
        this.isConnected = false;
      });
    }
  }
})