import GroceryModel from '../../models/Grocery.Model.js'
import GroupModel from '../../models/Group.Model.js'
import { getGroupTaskController, updateTaskController } from '../utils/task.controller.js'

export async function addGroceryController(req, res) {
  try {
    const { groupId } = req.params

    const group = await GroupModel.findById(groupId)

    if(!group) {
      return res.status(404).send({ message: "Group not found" })
    }

    const grocery = await GroceryModel.create({ 
      ...req.body, 
      groupId,
      completed: false 
    })

    group.groceries.push(grocery._id)
    group.save()
  
    const groceryObj = grocery.toObject()
    groceryObj.id = groceryObj._id
    delete groceryObj._id
  
    return res.status(200).send(groceryObj)
  } catch(error) {
    console.log(error)
    return res.status(error.status).send({ message: error.message })
  }
}

export async function getGroupGroceriesController(req, res) {
  return getGroupTaskController(req, res, GroceryModel)
}

export async function updateGroceryController(req, res) {
  const { groceryId } = req.params
  return updateTaskController(req, res, GroceryModel, groceryId)
}

export async function getGroceryController(req, res) {
  const { groceryId } = req.params
  
  if(isNaN(parseInt(groceryId))) {
    return res.status(404).send({
      message: "Invalid Grocery"
    })
  }

  return res.send({
    groceryId,
    message: "Get grocery"
  })
}