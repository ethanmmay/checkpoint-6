import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { taskService } from '../services/TaskService'
import { commentService } from '../services/CommentService'

export class TaskController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getComments)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      res.send(await taskService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await taskService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      // ALSO GET listId FROM CORRESPONDING COMPONENT
      req.body.creatorId = req.userInfo.id
      res.send(await taskService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await taskService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await taskService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      res.send(await commentService.findByTaskId(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
