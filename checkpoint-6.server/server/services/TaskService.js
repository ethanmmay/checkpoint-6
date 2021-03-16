import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TaskService {
  async find(query = {}) {
    return await dbContext.Tasks.find(query).populate('creatorId listId')
  }

  async findById(id) {
    const task = await dbContext.Tasks.findById(id).populate('creatorId listId')
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async findByListId(listId) {
    // FIND BY BOARD ID
  }

  async create(body) {
    return await dbContext.Tasks.create(body).populate('creatorId listId')
  }

  async delete(id) {
    const Task = await dbContext.Tasks.findByIdAndDelete(id).populate('creatorId listId')
    if (!Task) {
      throw new BadRequest('No Task exists with that ID')
    }
    return Task
  }

  async edit(id, body) {
    return await dbContext.Tasks.findByIdAndUpdate(id, body).populate('creatorId listId')
  }
}

export const taskService = new TaskService()
