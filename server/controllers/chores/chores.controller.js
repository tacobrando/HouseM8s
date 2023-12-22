import { 
  deleteTaskController, 
  getGroupTaskController, 
  updateTaskController 
} from "../utils/task.controller.js";
import ChoreModel from '../../models/Chore.Model.js'
import GroupModel from "../../models/Group.Model.js";

export async function addChoreController(req, res) {
  try {
    const { groupId } = req.params

    const group = await GroupModel.findById(groupId)

    if(!group) {
      return res.status(404).send({ message: "Group not found" })
    }

    const chore = await ChoreModel.create({ 
      ...req.body, 
      groupId,
      completed: null 
    })

    group.chores.push(chore._id)
    group.save()
  
    const choreObj = chore.toObject()
    choreObj.id = choreObj._id
    delete choreObj._id
  
    return res.status(200).send(choreObj)
  } catch(error) {
    return res.status(error.status).send({ message: error.message })
  }
}

export async function getGroupChoresController(req, res) {
  return getGroupTaskController(req, res, ChoreModel)
}

export async function updateChoreController(req, res) {
  const { choreId } = req.params
  const userId = req.user._id.toString();
  return updateTaskController(res, ChoreModel, choreId, userId)
}

export async function deleteChoreController(req, res) {
  const { choreId } = req.params
  return deleteTaskController(res, ChoreModel, choreId)
}