import mongoose from "mongoose"

export default mongoose.model("User", new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }]
}, { timestamps: true }))