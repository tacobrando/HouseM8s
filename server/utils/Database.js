import mongoose from 'mongoose'
import dotenv from "dotenv"
import { Console } from './Tools.js'

dotenv.config()

export const Database = Object.freeze({
  uri: process.env.MONGO_URI,
  async Connect() {
    try {
      await mongoose.connect(this.uri)
      Console.Success("Connected to MongoDB")
    } catch(error) {
      Console.Error(error)
    }
  }
})