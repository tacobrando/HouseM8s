import "dotenv/config"
import jwt from 'jsonwebtoken'
import { compare } from "bcrypt"
import UserModel from "../../models/User.Model.js"
import { Cookie } from "../../lib/Cookie.js"

export async function loginController(req, res) {
  try{    
    const { username, password } = req.body
  
    const user = await UserModel.findOne({ username: new RegExp(`^${username}$`, 'i') })
  
    if(!user) {
      return res.status(401).send({ message: "User not found." })
    }
  
    const isMatch = await compare(password, user.password)
  
    if(!isMatch) {
      return res.status(401).send({ message: "Invalid credentials." })
    }
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
  
    res.cookie('Housem8s_token', token, Cookie.options);
  
    const userObject = user.toObject()
    delete userObject.password
  
    return res.status(200).send({
      message: "Login successful.",
      user: userObject
    })
  } catch(error) {
    return res.status(error.response?.status||500).send({ message: error.message })
  }
}

export async function logoutController(req, res) {
  res.cookie('Housem8s_token', '', { ...Cookie.options, maxAge: new Date(0) })
  return res.status(200).send({ message: "Logout successful." })
}

export async function verifyTokenController(req, res) {
  const token = req.cookies['Housem8s_token']
  if(!token) return res.status(401).send({ verified: false })

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if(err) return res.status(403).send({ verified: false })
    try {
      const user = await UserModel.findById(decoded.userId)
      if(!user) return res.status(401).send({ verified: false })
      const userObject = user.toObject()
      delete userObject.password

      return res.status(200).send({ verified: true, user: userObject })
    } catch(error) {

    }
  })

}