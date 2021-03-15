import mongoose from 'mongoose'
import ListSchema from '../models/List'
import AccountSchema from '../models/Account'

class DbContext {
  Lists = mongoose.model('List', ListSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
