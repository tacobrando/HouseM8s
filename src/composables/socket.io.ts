import { io, Socket } from 'socket.io-client'
import { defineStore } from 'pinia'
import { API_URL } from '@/utils/Constants'

interface SocketState {
  socket: Socket | null,
  isConnected: boolean
}

export const useSocket = defineStore('socket', {
  state: (): SocketState => ({
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