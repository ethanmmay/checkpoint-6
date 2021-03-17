import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListService {
  async find(query = {}) {
    return await dbContext.Lists.find(query)
  }

  async findById(id) {
    const list = await dbContext.Lists.findById(id)
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }

  async findByBoardId(boardId) {
    // FIND BY BOARD ID
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async delete(id) {
    const list = await dbContext.Lists.findByIdAndDelete(id)
    if (!list) {
      throw new BadRequest('No List exists with that ID')
    }
    return list
  }

  async edit(id, body) {
    await dbContext.Lists.findByIdAndUpdate(id, body)
    return await dbContext.Lists.findById(id)
  }
}

export const listService = new ListService()
