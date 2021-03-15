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

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async delete(id) {
    const post = await dbContext.Lists.findByIdAndDelete(id)
    if (!post) {
      throw new BadRequest('No List exists with that ID')
    }
  }

  async edit(id, body) {
    return await dbContext.Lists.findByIdAndUpdate(id, body)
  }
}

export const listService = new ListService()
