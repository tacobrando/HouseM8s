import mongoose from 'mongoose';
import "dotenv/config";
import { Console } from './Tools.js';

export const Database = Object.freeze({
  uri: process.env.MONGO_URI,
  async Connect() {
    try {
      await mongoose.connect(this.uri);
      Console.Success("Connected to MongoDB");
    } catch(error) {
      Console.Error(`Failed to connect to MongoDB: ${error.message}`);
      // For development only
      // If offline/unable to connect, connect to mongo community
      // try {
      //   await mongoose.connect(this.localUri);
      //   Console.Success("Connected to local MongoDB");
      // } catch(localError) {
      //   Console.Error(`Failed to connect to local MongoDB: ${localError.message}`);
      // }
    }
  }
});
