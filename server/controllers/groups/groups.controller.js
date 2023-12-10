import { Server } from "../../services/server/server.js";
import GroupModel from '../../models/Group.Model.js'

export async function addGroupController(req, res) {
  const groupInfo = req.body
  const userId = req.user._id.toString()
  if(groupInfo.owner !== userId) {
    return res.status(403).send({ message: "Invalid User" })
  }

  const group = await GroupModel.create({ ...groupInfo })

  const groupObj = group.toObject()
  groupObj.id = groupObj._id
  delete groupObj._id

  return res.status(200).json(groupObj)
}

export async function getAllGroupsController(req, res) {
  try{
    const userId = req.user._id
    const groups = await GroupModel.find({
      $or: [{ owner: userId }, { members: userId }]
    })
    const sorted = groups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return res.status(200).json(sorted)
  } catch(error) {
    return res.status(400).send({ message: "Invalid request" })
  }
}