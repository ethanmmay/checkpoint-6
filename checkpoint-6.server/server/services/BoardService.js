import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardService {
  async find(query = {}) {
    return await dbContext.Boards.find(query)
  }

  async findById(id) {
    const board = await dbContext.Boards.findById(id)
    if (!board) {
      throw new BadRequest('No Board exists with that Id')
    }
    return board
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async delete(id) {
    const post = await dbContext.Boards.findByIdAndDelete(id)
    if (!post) {
      throw new BadRequest('No Board exists with that ID')
    }
  }

  async edit(id, body) {
    return await dbContext.Boards.findByIdAndUpdate(id, body)
  }
}

export const boardService = new BoardService()
