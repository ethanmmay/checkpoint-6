/* eslint-disable no-undef */
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

  async deleteBoard(id) {
    try {
      const i = AppState.boards.findIndex(b => b.id === id)
      AppState.boards.splice(i, 1)
      await api.delete('api/boards/' + id)
    } catch (err) {
      logger.error('Could not delete board', err)
    }
  }

  async editBoard(rawBoard) {
    Swal.fire({
      title: 'Edit Board',
      html: `<input type="text" id="title" class="swal2-input" placeholder="Board Title" value="${rawBoard.title}">`,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        if (!title) {
          Swal.showValidationMessage('Please enter a board title.')
        }
        return { title: title }
      }
    }).then(async(result) => {
      const editedboard = {
        title: result.value.title
      }
      await api.put('api/boards/' + rawBoard.id, editedboard)
      this.getBoards()
    })
  }
}

export const boardService = new BoardService()
