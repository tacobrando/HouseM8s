import GroupModel from "../../models/Group.Model.js"

export async function updateTaskController(req, res, model, id) {
  try {
    const task = await model.findByIdAndUpdate(id)

    task.completed = !task.completed
    task.save()

    return res.status(200).send({ completed: task.completed })
  } catch(error) {
    return res.status(error.status).send({ message: error.message })
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