import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async find(query = {}) {
    return await dbContext.Comments.find(query).populate('creator')
  }

  async findById(id) {
    const task = await dbContext.Comments.findById(id).populate('creator')
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async findByTaskId(taskId) {
    // FIND BY BOARD ID
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async delete(id) {
    const Task = await dbContext.Comments.findByIdAndDelete(id)
    if (!Task) {
      throw new BadRequest('No Task exists with that ID')
    }
    return Task
  }

  async edit(id, body) {
    return await dbContext.Comments.findByIdAndUpdate(id, body)
  }
}

export const commentService = new CommentService()
