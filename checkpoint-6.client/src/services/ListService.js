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

  async deleteList(id) {
    try {
      const i = AppState.lists.findIndex(l => l.id === id)
      AppState.lists.splice(i, 1)
      const res = await api.delete('api/lists/' + id)
      logger(res)
    } catch (err) {
      logger.error('Could not delete list', err)
    }
  }

  async createList(event, route) {
    try {
      const rawList = {
        title: event.target.listTitle.value,
        color: event.target.listColor.value,
        creatorId: AppState.user.id,
        boardId: route.params.id
      }
      AppState.lists.push(rawList)
      await api.post('api/lists', rawList)
      this.getLists()
    } catch (error) {
      logger.log(error)
    }
  }
}

export const listService = new ListService()
