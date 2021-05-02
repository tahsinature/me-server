import { BaseRepository } from './baseRepository'
import Markdown from '@src/models/Markdown'

class Repository extends BaseRepository {
  model = Markdown

  getAll() {
    return this.model.find()
  }
}

export default new Repository()
