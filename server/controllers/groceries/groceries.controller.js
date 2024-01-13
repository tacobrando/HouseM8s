import GroceryModel from '../../models/Grocery.Model.js'
import GroupModel from '../../models/Group.Model.js'
import { SocketEvent } from '../../utils/Tools.js'
import { deleteTaskController, getGroupTaskController, updateTaskController } from '../utils/task.controller.js'

export async function addGroceryController(req, res) {
  try {
    const { groupId } = req.params
    const group = await GroupModel.findById(groupId)
    const io = req.app.get('io')

    if(!group) {
      return res.status(404).send({ message: "Group not found" })
    }

    const grocery = await GroceryModel.create({ 
      ...req.body, 
      groupId,
      completed: {
        userId: null,
        image: null,
        name: null
      } 
    })

    group.groceries.push(grocery._id)
    group.save()
  
    const groceryObj = grocery.toObject()
    groceryObj.id = groceryObj._id
    delete groceryObj._id
    
    io.to(groupId).emit(SocketEvent.GROCERY.ADDED, { groupName: group.name, type: "grocery", task: groceryObj });
    return res.status(200).json(groceryObj)
  } catch(error) {
    return res.status(error.status).send({ message: error.message })
  }
}

export async function getGroupGroceriesController(req, res) {
  return getGroupTaskController(req, res, GroceryModel)
}

export async function updateGroceryController(req, res) {
  const { groceryId } = req.params
  const userId = req.user._id.toString();
  return updateTaskController(req, res, GroceryModel, groceryId, userId, SocketEvent.GROCERY)
}

export async function deleteGroceryController(req, res) {
  const { groceryId } = req.params
  return deleteTaskController(req, res, GroceryModel, groceryId, "Grocery", SocketEvent.GROCERY)
}

// export async function getGroceryController(req, res) {
//   const { groceryId } = req.params
  
//   if(isNaN(parseInt(groceryId))) {
//     return res.status(404).send({
//       message: "Invalid Grocery"
//     })
//   }

//   return res.send({
//     groceryId,
//     message: "Get grocery"
//   })
// }