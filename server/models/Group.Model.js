import mongoose from "mongoose"
import { MemberSchema } from "./schema/Member.Schema.js"

export default mongoose.model("Group", new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  members: [MemberSchema],
  chores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chore"
  }],
  groceries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grocery"
  }]
}, { timestamps: true }))