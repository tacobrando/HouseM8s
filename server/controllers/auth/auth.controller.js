import "dotenv/config"
import jwt from 'jsonwebtoken'
import { compare } from "bcrypt"
import UserModel from "../../models/User.Model.js"

export async function loginController(req, res) {
  const { username, password } = req.body
  
  const user = await UserModel.findOne({ username })

  if(!user) {
    return res.status(401).send({ message: "User not found" })
  }

  const isMatch = await compare(password, user.password)

  if(!isMatch) {
    return res.status(401).send({ message: "Invalid credentials." })
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

  res.cookie('Housem8s_token', token, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 604800000
  });

  const userObject = user.toObject()
  delete userObject.password

  return res.status(200).send({
    message: "Login successful",
    user: userObject
  })
}