import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listService } from '../services/ListService'
import { taskService } from '../services/TaskService'

export class ListController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getTasks)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      res.send(await listService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await listService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      // ALSO GET boardId FROM CORRESPONDING COMPONENT
      req.body.creatorId = req.userInfo.id
      res.send(await listService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await listService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await listService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getTasks(req, res, next) {
    try {
      res.send(await taskService.findByListId(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
