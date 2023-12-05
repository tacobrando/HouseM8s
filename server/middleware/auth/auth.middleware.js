import "dotenv/config"
import jwt from "jsonwebtoken"
import UserModel from "../../models/User.Model.js"
import { Console } from "../../utils/Tools.js"

export function authenticateToken(req, res, next) {
 const token = req.cookies['Housem8s_token']
 if(!token) {
  return res.status(401).send({ message: "No token provided." })
 }

 jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if(err) {
      return res.status(403).send({ message: "Invalid token" })
    }

    try {
      const user = await UserModel.findById(decoded.userId)
      if(!user) {
        return res.status(401).send({ message: "User not found." });
      }
      const userObject = user.toObject()
      delete userObject.password

      req.user = userObject
      next()
    } catch(error) {
      Console.Log(error)
      return res.status(500).send({ message: "Internal server error." });
    }
 })
}