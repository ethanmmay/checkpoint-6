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

  async editList(rawList) {
    Swal.fire({
      title: 'Edit List',
      html: `<input type="text" id="title" class="swal2-input" placeholder="Board Title" value="${rawList.title}">`,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        if (!title) {
          Swal.showValidationMessage('Please enter a list title.')
        }
        return { title: title }
      }
    }).then(async(result) => {
      const editedList = {
        title: result.value.title
      }
      await api.put('api/lists/' + rawList.id, editedList)
      this.getLists()
    })
  }
}

export const listService = new ListService()
