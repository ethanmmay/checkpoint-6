/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentService {
  async getComments() {
    try {
      const res = await api.get('api/comments')
      AppState.comments = res.data
    } catch (err) {
      logger.error('Could not retrieve comments', err)
    }
  }

  async deleteComment(id) {
    try {
      const i = AppState.comments.findIndex(l => l.id === id)
      AppState.comments.splice(i, 1)
      const res = await api.delete('api/comments/' + id)
      logger(res)
    } catch (err) {
      logger.error('Could not delete comment', err)
    }
  }

  async createComment(taskId) {
    Swal.fire({
      title: 'Create Comment',
      html: '<input type="text" id="title" class="swal2-input" placeholder="Enter your comment...">',
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        if (!title) {
          Swal.showValidationMessage('Please enter a comment title.')
        }
        return { title: title }
      }
    }).then(async(result) => {
      const rawComment = {
        title: result.value.title,
        taskId: taskId,
        creatorId: AppState.user.id
      }
      await api.post('api/comments', rawComment)
      this.getComments()
    })
  }

  async editComment(rawComment) {
    Swal.fire({
      title: 'Edit Comment',
      html: `<input type="text" id="title" class="swal2-input" placeholder="Board Title" value="${rawComment.title}">`,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        if (!title) {
          Swal.showValidationMessage('Please enter a comment title.')
        }
        return { title: title }
      }
    }).then(async(result) => {
      const editedComment = {
        title: result.value.title
      }
      await api.put('api/comments/' + rawComment.id, editedComment)
      this.getComments()
    })
  }
}

export const commentService = new CommentService()
