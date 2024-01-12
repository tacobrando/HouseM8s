import { Schema } from "mongoose";

export const MemberSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: String,
    ref: "User"
  },
  image: {
    type: String,
    ref: "User"
  },
  joined: Date
}, { _id: false })