import UserModel from "../../models/User.Model.js"
import { SocketEvent } from "../../utils/Tools.js"

export async function updateTaskController(req, res, model, taskId, userId) {
  try {
    const { groupId } = req.params
    const io = req.app.get('io')
    const task = await model.findByIdAndUpdate(taskId)
    const user = await UserModel.findById(userId)
    if(task.completed.userId) {
      task.completed = {
        userId: null,
        name: null
      }
    } else {
      task.completed = {
        userId: user._id,
        name: user.username
      }
    }
    
    await task.save()
    io.to(groupId).emit(SocketEvent.TASK_UPDATED, { taskId: task.id, completed: task.completed })
    return res.status(200).end()
  } catch(error) {
    console.log(error)
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

export async function deleteTaskController(res, model, id) {
  try {
    const result = await model.findByIdAndDelete(id)

    if(result) {
      return res.status(200).json({ message: 'Task deleted successfully.' })
    } else {
      return res.status(404).json({ message: "Task not found!" })
    }

  } catch(error) {
    return res.status(error.response?.status || 500).json({ message: error.response.message })
  }
}