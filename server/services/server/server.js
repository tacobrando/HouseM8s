import 'dotenv/config'
import express from "express"
import http from "http";
import router from "../../routes/routes.js";
import cors from "cors"
import path from 'path';
import { Server as SocketServer } from "socket.io"
import { createServer } from 'vite'
import { Console, SocketEvent } from '../../utils/Tools.js'
import { ORIGIN, HOST, PORT } from '../../utils/Constants.js';
import { Database } from "../../utils/Database.js"
import { Session } from '../../lib/Session.js';
import session from 'express-session';
import { fileURLToPath } from 'url';

var logged = false

export const Server = {
  app: express(),
  server: null,
  __dirname: path.dirname(fileURLToPath(import.meta.url)),
  io: null,
  cors: {
    origin: ORIGIN,
    credentials: true,

  },
  async Start() {
    Console.TimeStart("\x1b[2J\x1b[3J\x1b[HHouseM8s API v.0.1", "ready in")
    this.app.use(cors(this.cors))
    this.app.use(express.json())
    this.app.enable('trust proxy', true)
    this.app.use(session(Session.config))
    this.app.use('/api', router)

    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server, { cors: this.cors })
    this.app.set('io', this.io)

    this.server.listen(PORT, () => {
      Console.TimeEnd("\x1b[2J\x1b[3J\x1b[HHouseM8s API v.0.1", "ready in")
      console.log("")
      Console.Info(`\u001b[37mNetwork: \u001b[1;34m${HOST}:${PORT}\n`)
      Console.Log()
    })
    if(process.env.NODE_ENV !== 'production') {
      const vite = await createServer({
        server: { middlewareMode: 'html' }
      })
      this.app.use(vite.middlewares)
    } else {
      const staticPath = path.join(this.__dirname, '..', '..', '..', 'dist')
      this.app.use(express.static(staticPath))
      this.app.get('*', (req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'));
      });
    }

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