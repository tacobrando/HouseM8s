import { io } from 'socket.io-client'
import { defineStore } from 'pinia'

export const useSocket = defineStore('socket', {
  state: () => ({
    socket: null,
    isConnected: false
  }),
  actions: {
    init() {
      this.socket = io('http://localhost:3000')
      this.socket.on('connected', () => {
        this.isConnected = true
      })
      this.socket.on('disconnect', () => {
        this.isConnected = false;
      });
    }
  }
})