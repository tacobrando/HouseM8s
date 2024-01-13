import "dotenv/config"
import { compare } from "bcrypt"
import UserModel from "../../models/User.Model.js"

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
    req.session.userId = user._id
  
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
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send({ message: "Error logging out" });
    }
    res.status(200).send({ message: "Logout successful." });
  });
}


export async function verifySessionController(req, res) {
  if (!req.session.userId) {
    return res.status(401).send({ verified: false });
  }

  try {
    const user = await UserModel.findById(req.session.userId);
    if (!user) {
      return res.status(401).send({ verified: false });
    }

    const userObject = user.toObject();
    delete userObject.password;

    return res.status(200).send({ verified: true, user: userObject });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error." });
  }
}