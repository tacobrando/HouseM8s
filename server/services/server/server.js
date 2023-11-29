import express from "express"
import { Server as SocketServer } from "socket.io"
import http from "http";
import { Console } from '../../utils/Tools.js'
import { Database } from "../../utils/Database.js"

export const Server = {
  app: express(),
  server: null,
  io: null,
  async Start() {
    Console.TimeStart("\x1b[2J\x1b[3J\x1b[HHouseM8s API v.0.1", "ready in")
    this.app.use(express.json())
    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server, {
      serveClient: false,
      cors: { origin: "*" }
    })

    this.server.listen(3000, () => {
      Console.TimeEnd("\x1b[2J\x1b[3J\x1b[HHouseM8s API v.0.1", "ready in")
      console.log("")
      Console.Info("\u001b[37mLocal: \u001b[1;34mhttp://localhost:3000/\n")
      Console.Log()
    }) 
    this.io.on('connection', (socket) => {
      Console.Success("Connected to Socket.io")
    })
    Database.Connect()
  }
}