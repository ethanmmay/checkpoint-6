import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TaskService {
  async find(query = {}) {
    return await dbContext.Tasks.find(query)
  }

  async findById(id) {
    const task = await dbContext.Tasks.findById(id)
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async findByListId(listId) {
    // FIND BY BOARD ID
  }

  async create(body) {
    return await dbContext.Tasks.create(body)
  }

  async delete(id) {
    const Task = await dbContext.Tasks.findByIdAndDelete(id)
    if (!Task) {
      throw new BadRequest('No Task exists with that ID')
    }
    return Task
  }

  async edit(id, body) {
    return await dbContext.Tasks.findByIdAndUpdate(id, body)
  }
}

export const taskService = new TaskService()
