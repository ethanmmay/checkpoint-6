/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ListService {
  async getLists() {
    try {
      const res = await api.get('api/lists')
      AppState.lists = res.data
    } catch (err) {
      logger.error('Could not retrieve lists', err)
    }
  }

  async createList(event) {
    try {
      const rawList = {
        title: event.target.listTitle.value,
        color: event.target.listColor.value,
        creatorId: AppState.user.id,
        boardId: AppState.currentBoardId
      }
      AppState.lists.unshift(rawList)
      await api.post('api/lists', rawList)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const listService = new ListService()
