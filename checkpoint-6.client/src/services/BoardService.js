import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api, unsplashApi } from './AxiosService'

class BoardService {
  async getBoards() {
    try {
      const res = await api.get('api/boards')
      AppState.boards = res.data
    } catch (err) {
      logger.error('Could not retrieve boards', err)
    }
  }

  async createBoard(event) {
    try {
      const res = await unsplashApi.get('')
      const rawBoard = {
        title: event.target.boardTitle.value,
        creatorId: AppState.user.id,
        bgImg: res.data.urls.small
      }
      AppState.boards.push(rawBoard)
      await api.post('api/boards', rawBoard)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const boardService = new BoardService()
