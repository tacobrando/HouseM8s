import { Schema } from "mongoose"

export const TaskSchema = new Schema({
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