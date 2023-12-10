import mongoose from 'mongoose';
import "dotenv/config";
import { Console } from './Tools.js';

export const Database = Object.freeze({
  cloudUri: process.env.MONGO_URI,
  localUri: process.env.MONGO_LOCAL_URI,
  async Connect() {
    try {
      await mongoose.connect(this.cloudUri);
      Console.Success("Connected to cloud MongoDB");
    } catch(error) {
      Console.Error(`Failed to connect to cloud MongoDB: ${error.message}`);
      //If offline/unable to connect, connect to mongo community
      try {
        await mongoose.connect(this.localUri);
        Console.Success("Connected to local MongoDB");
      } catch(localError) {
        Console.Error(`Failed to connect to local MongoDB: ${localError.message}`);
      }
    }
  }
});
