import { Cookie } from "./Cookie.js"
import MongoStore from "connect-mongo"

export const Session = Object.freeze({
  config: {
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    proxy : true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    }),
    cookie: Cookie.options
  }
})
