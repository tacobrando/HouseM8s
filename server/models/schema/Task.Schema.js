import { Schema } from "mongoose"

export const TaskSchema = new Schema({
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: Schema.Types.String,
      ref: "User"
    }
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group"
  },
  item: {
    type: String,
    required: true
  },
  completed: Boolean
}, { timestamps: true })