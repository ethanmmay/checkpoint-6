import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async find(query = {}) {
    return await dbContext.Comments.find(query).populate('creatorId listId')
  }

  async findById(id) {
    const task = await dbContext.Comments.findById(id).populate('creatorId listId')
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async findByTaskId(taskId) {
    // FIND BY BOARD ID
  }

  async create(body) {
    return await dbContext.Comments.create(body).populate('creatorId listId')
  }

  async delete(id) {
    const Task = await dbContext.Comments.findByIdAndDelete(id).populate('creatorId listId')
    if (!Task) {
      throw new BadRequest('No Task exists with that ID')
    }
    return Task
  }

  async edit(id, body) {
    return await dbContext.Comments.findByIdAndUpdate(id, body).populate('creatorId listId')
  }
}

export const commentService = new CommentService()
