import 'dotenv/config'
import UserModel from '../../models/User.Model.js'
import { isValidEmail } from '../../utils/Helpers.js'
import { Console } from '../../utils/Tools.js'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function registerUserController(req, res) {
  try {
    const { info: newUser } = req.body

    if(!newUser) {
      return res.status(400).send({
        message: "Field is required."
      })
    }

    if (!isValidEmail(newUser.email)) {
      return res.status(400).send({
        message: "Invalid email."
      });
    }

    if(newUser.password !== newUser.confirmPassword) {
      return res.status(400).send({
        message: "Passwords do not match!"
      })
    }

    const existingEmail = await UserModel.findOne({ email: newUser.email })

    if(existingEmail) {
      return res.status(400).send({
        message: "Email is already in use!"
      })
    }

    const existingUsername = await UserModel.findOne({ username: newUser.username })

    if(existingUsername) {
      return res.status(400).send({
        message: "Username is already in use!"
      })
    }

    const { confirmPassword, password, ...userData } = newUser
    const hashedPassword = await hash(password, 10)

    const user = await UserModel.create({ ...userData, password: hashedPassword })

    const userObject = user.toObject()
    delete userObject.password

    const token = jwt.sign({ userId: userObject._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
    res.cookie('Housem8s_token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 604800000
    })

    return res.status(200).send({
      message: "Register User",
      user: userObject
    })
  } catch(error) {
    Console.Error(error);
    return res.status(500).send({
      message: "An error occurred during registration."
    });
  }
}

export async function getUsersController(req, res) {
  try {
    const users = await UserModel.find({})
    return res.status(200).send(users.map(user => {
      const userObj = user.toObject();
      userObj.id = userObj._id
      delete userObj._id
      delete userObj.password;
      return userObj;
    }))

  } catch(error) {
    console.log(error)
    return res.status(400).send({ message: error.message })
  } 
}

export async function getUserController(req, res) {
  const { userId } = req.body

  const user = await UserModel.findById(userId)

  if(!user) {
    return res.status(401).send({ message: "User not found." });
  }
}

export async function getCookie(req, res) {
  const token = req.cookies['Housem8s_token']
  console.log(token)
  return
}


