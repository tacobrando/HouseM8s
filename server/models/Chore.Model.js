import mongoose from "mongoose"
import { TaskSchema } from "./schema/Task.Schema.js"

export default mongoose.model("Chore", TaskSchema)