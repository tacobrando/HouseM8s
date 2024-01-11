import GroupModel from "../../models/Group.Model.js"
import UserModel from "../../models/User.Model.js"

export async function updateTaskController(req, res, model, taskId, userId, event) {
  try {
    const { groupId } = req.params
    const io = req.app.get('io')
    const task = await model.findByIdAndUpdate(taskId)
    const user = await UserModel.findById(userId)
    const group = await GroupModel.findById(task.groupId)
    if(task.completed.userId) {
      task.completed = {
        userId: null,
        image: null,
        name: null
      }
    } else {
      task.completed = {
        userId: user._id,
        image: user.image,
        name: user.username
      }
    }
    
    await task.save()
    io.to(groupId).emit(event.UPDATED, { taskId: task.id, groupName: group.name, completed: task.completed })
    return res.status(200).end()
  } catch(error) {
    return res.status(error.response?.status || 500).send({ message: error.message })
  }
}

export async function getGroupTaskController(req, res, model) {
  try {
    const { groupId } = req.params

    const tasks = await model.find({ groupId: groupId })

    const modified = tasks.map(chore => {
      const taskObj = chore.toObject()
      taskObj.id = taskObj._id
      delete taskObj._id
      return taskObj
    })

    const sorted = modified.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return res.status(200).json(sorted)
  } catch(error) {
    return res.status(error.status).send({ message: error.message })
  }
}

export async function deleteTaskController(req, res, model, id, type, event) {
  try {
    const { groupId } = req.params
    const group = await GroupModel.findById(groupId)
    const result = await model.findByIdAndDelete(id)
    const io = req.app.get('io')
    if(result) {
      io.to(groupId).emit(event.DELETE, { groupName: group.name, taskId: id, type: type, user: req.user.username })
      return res.status(200).json({ message: `${type} deleted successfully.` })
    } else {
      return res.status(404).json({ message: `${type} not found!` })
    }

  } catch(error) {
    return res.status(error.response?.status || 500).json({ message: error.response.message })
  }
}