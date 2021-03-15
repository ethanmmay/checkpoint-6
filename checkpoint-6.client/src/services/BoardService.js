import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardService {
  async getBoards() {
    try {
      const res = await api.get('api/boards')
      AppState.boards = res.data
      console.log(AppState.boards)
    } catch (err) {
      logger.error('Could not retrieve boards', err)
    }
  }
}

export const boardService = new BoardService()
