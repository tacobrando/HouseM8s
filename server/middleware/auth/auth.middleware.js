import "dotenv/config"
import UserModel from "../../models/User.Model.js"
import { Console } from "../../utils/Tools.js"

export async function authenticateSession(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ message: "Not authenticated." });
  }

  try {
    const user = await UserModel.findById(req.session.userId);
    if (!user) {
      return res.status(401).send({ message: "User not found." });
    }

    const userObject = user.toObject();
    delete userObject.password;

    req.user = userObject;
    next();
  } catch (error) {
    Console.Log(error);
    return res.status(500).send({ message: "Internal server error." });
  }
}