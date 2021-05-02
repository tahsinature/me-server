import { BaseRepository } from './baseRepository'
import AppData from '@root/src/models/AppData'

class Repository extends BaseRepository {
  model = AppData

  async get() {
    return this.model.findOne()
  }
}

export default new Repository()
