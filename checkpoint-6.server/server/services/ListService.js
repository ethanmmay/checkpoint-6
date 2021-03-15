import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListService {
  async find(query = {}) {
    return await dbContext.Lists.find(query).populate('creatorId boardId')
  }

  async findById(id) {
    const list = await dbContext.Lists.findById(id).populate('creatorId boardId')
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }

  async findByBoardId(boardId) {
    // FIND BY BOARD ID
  }

  async create(body) {
    return await dbContext.Lists.create(body).populate('creatorId boardId')
  }

  async delete(id) {
    const list = await dbContext.Lists.findByIdAndDelete(id).populate('creatorId boardId')
    if (!list) {
      throw new BadRequest('No List exists with that ID')
    }
    return list
  }

  async edit(id, body) {
    return await dbContext.Lists.findByIdAndUpdate(id, body).populate('creatorId boardId')
  }
}

export const listService = new ListService()
