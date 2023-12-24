import 'dotenv/config'
import express from "express"
import http from "http";
import router from "../../routes/routes.js";
import cors from "cors"
import cookieParser from 'cookie-parser'
import { Server as SocketServer } from "socket.io"
import { Console, SocketEvent } from '../../utils/Tools.js'
import { Database } from "../../utils/Database.js"

var logged = false

export const Server = {
  app: express(),
  server: null,
  io: null,
  cors: {
    origin: process.env.ORIGIN_HOST,
    credentials: true
  },
  async Start() {
    Console.TimeStart("\x1b[2J\x1b[3J\x1b[HHouseM8s API v.0.1", "ready in")
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(cors(this.cors))
    this.app.use('/api', router)

    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server, { cors: this.cors })
    this.app.set('io', this.io)

    this.server.listen(3000, () => {
      Console.TimeEnd("\x1b[2J\x1b[3J\x1b[HHouseM8s API v.0.1", "ready in")
      console.log("")
      Console.Info(`\u001b[37mLocal: \u001b[1;34m${process.env.HOST}:${process.env.PORT}\n`)
      Console.Log()
    }) 
    this.io.on('connection', (socket) => {
      if(!logged) {
        Console.Success("Connected to Socket.io")
        logged = !logged
      }
      socket.on(SocketEvent.JOIN_GROUP, (info) => {
        socket.join(info.groupId)
      })
    })
    Database.Connect()
  }
}