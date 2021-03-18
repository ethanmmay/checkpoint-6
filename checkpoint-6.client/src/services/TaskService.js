/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TaskService {
  async getTasks() {
    try {
      const res = await api.get('api/tasks')
      AppState.tasks = res.data
    } catch (err) {
      logger.error('Could not retrieve tasks', err)
    }
  }

  createTask(listId) {
    try {
      Swal.fire({
        title: 'New Task',
        html: '<input type="text" id="title" class="swal2-input" maxlength=10 placeholder="Task Name">',
        confirmButtonText: 'Create',
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector('#title').value
          if (!title) {
            Swal.showValidationMessage('Please enter a task title.')
          }
          return { title: title }
        }
      }).then(async (result) => {
        const newTask = {
          title: result.value.title,
          creatorId: AppState.user.id,
          listId: listId
        }
        AppState.tasks.push(newTask)
        await api.post('api/tasks', newTask)
        this.getTasks()
      })
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteTask(id) {
    try {
      const i = AppState.tasks.findIndex(t => t.id === id)
      AppState.tasks.splice(i, 1)
      await api.delete('api/tasks/' + id)
    } catch (err) {
      logger.error('Could not delete task', err)
    }
  }

  async editTask(rawTask) {
    Swal.fire({
      title: 'Edit Task',
      html: `<input type="text" id="title" class="swal2-input" placeholder="Board Title" value="${rawTask.title}">`,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        if (!title) {
          Swal.showValidationMessage('Please enter a list title.')
        }
        return { title: title }
      }
    }).then(async (result) => {
      const editedTask = {
        title: result.value.title
      }
      await api.put('api/tasks/' + rawTask.id, editedTask)
      this.getTasks()
    })
  }
}

export const taskService = new TaskService()
