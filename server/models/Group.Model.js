import mongoose from "mongoose"

export default mongoose.model("Group", new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  chores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chore"
  }],
  groceries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grocery"
  }]
}, { timestamps: true }))