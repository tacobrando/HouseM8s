import { Server } from "../../services/server/server.js";
import GroupModel from '../../models/Group.Model.js'

export async function addGroupController(req, res) {
  console.log(req.body)
  console.log(req.user)

  return res.status(200).send(req.user)
}