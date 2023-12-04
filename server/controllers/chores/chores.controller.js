import { Server } from "../../services/server/server.js";
import ChoreModel from '../../models/Chore.Model.js'
export async function addChoreController(req, res) {
  const { groupId } = req.params

  if(isNaN(parseInt(groupId))) {
    return res.status(404).send({
      message: "Invalid ID"
    })
  }
  console.log(req.body)
  return res.send({
    groupId,
    message: "Add chore"
  })
}

export async function getChoreController(req, res) {
  const { choreId } = req.params
  
  if(isNaN(parseInt(choreId))) {
    return res.status(404).send({
      message: "Invalid Chore"
    })
  }

  return res.send({
    choreId,
    message: "Get chore"
  })
}