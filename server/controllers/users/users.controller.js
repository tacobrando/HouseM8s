import 'dotenv/config'
import UserModel from '../../models/User.Model.js'
import { isValidEmail } from '../../utils/Helpers.js'
import { Console } from '../../utils/Tools.js'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import GroupModel from '../../models/Group.Model.js'

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

    const existingUsername = await UserModel.findOne({ username: new RegExp(`^${newUser.username}$`, 'i') })

    if(existingUsername) {
      return res.status(400).send({
        message: "Username is already in use!"
      })
    }

    const { confirmPassword, password, ...userData } = newUser
    const hashedPassword = await hash(password, 10)

    const user = await UserModel.create({ ...userData, password: hashedPassword })

    req.session.userId = user._id

    const userObject = user.toObject()
    delete userObject.password

    return res.status(200).send({
      message: "Registeration successful",
      user: userObject
    })
  } catch(error) {
    // Console.Error(error);
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
    return res.status(400).send({ message: error.message })
  } 
}

export async function getUserController(req, res) {
  try {
    const { userId } = req.params
    const user = await UserModel.findById(userId)
  
    if(!user) {
      return res.status(401).send({ message: "User not found." });
    }
    
    const userObj = user.toObject()
    userObj.id = userObj._id
    delete userObj._id
    delete userObj.password
  
    return res.status(200).send(userObj)
  } catch(error) {
    return res.status(error.response?.status || 500).send({ message: error.message })
  }
}

export async function updateUserController(req, res) {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    // Check if update is avatar image
    if (user && 'image' in updateData) {
      // Check all groups user is apart of
      const groups = await GroupModel.find({ 'members.userId': userId });

      // Update user avatar in all groups
      const updatedInfo = groups.map(group => {
        const memberIndex = group.members.findIndex(member => member.userId.toString() === userId);
        if (memberIndex !== -1) {
          group.members[memberIndex].image = updateData.image;
        }
        return group.save();
      });

      await Promise.all(updatedInfo);
    }

    return res.status(200).json({ message: 'Update successful.' });
  } catch (error) {
    return res.status(error.response?.status || 500).send({ message: error.message });
  }
}


export async function getCookie(req, res) {
  const token = req.cookies['Housem8s_token']
  return
}


