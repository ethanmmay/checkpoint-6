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

  createList() {
    try {
      Swal.fire({
        title: 'New List',
        html: '<input type="text" id="title" class="swal2-input" placeholder="List Name">',
        confirmButtonText: 'Create',
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector('#title').value
          if (!title) {
            Swal.showValidationMessage('Please enter a name')
          }
          return { title: title }
        }
      }).then(async(result) => {
        const newList = {
          title: result.value.title,
          creatorId: AppState.user.id,
          boardId: AppState.currentboardId // PUT ID IN LINK HERE
        }
        AppState.lists.push(newList)
        // await api.post('api/lists', newList)
        this.getLists()
      })
    } catch (error) {
      logger.log(error)
    }
  }
}

export const listService = new ListService()