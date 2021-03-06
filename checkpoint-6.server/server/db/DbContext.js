import mongoose from 'mongoose'
import ListSchema from '../models/List'
import AccountSchema from '../models/Account'
import BoardSchema from '../models/Board'
import TaskSchema from '../models/Task'
import CommentSchema from '../models/Comment'

class DbContext {
  Boards = mongoose.model('Board', BoardSchema);
  Lists = mongoose.model('List', ListSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Comments = mongoose.model('Comment', CommentSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
