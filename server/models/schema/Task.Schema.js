import { Schema } from "mongoose"

export default TaskSchema = new Schema({
  item: String,
  completed: Boolean
}, { timestamps: true })