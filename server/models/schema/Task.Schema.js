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
  price: {
    type: String,
    required: false
  },
  completed: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      ref: "User"
    }
  }
}, { timestamps: true })