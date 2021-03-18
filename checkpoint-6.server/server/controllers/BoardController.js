import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listService } from '../services/ListService'
import { boardService } from '../services/BoardService'

export class BoardController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/lists', this.getLists)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put(':/id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      res.send(await boardService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await boardService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await boardService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await boardService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await boardService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getLists(req, res, next) {
    try {
      res.send(await listService.findByBoardId(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
