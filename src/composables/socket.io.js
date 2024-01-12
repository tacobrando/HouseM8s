import { io } from 'socket.io-client'
import { defineStore } from 'pinia'
import { HOST, PORT } from '@/utils/Constants'

export const useSocket = defineStore('socket', {
  state: () => ({
    socket: null,
    isConnected: false
  }),
  actions: {
    init() {
      this.socket = io(`${HOST}`)
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