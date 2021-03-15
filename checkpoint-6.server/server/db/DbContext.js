import mongoose from 'mongoose'
import ListSchema from '../models/List'
import AccountSchema from '../models/Account'
import BoardSchema from '../models/Board'

class DbContext {
  Boards = mongoose.model('Board', BoardSchema);
  Lists = mongoose.model('List', ListSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
