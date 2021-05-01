import AppData from '@root/src/models/AppData'
import { BaseRepository } from '@src/repositories/BaseRepository'

class Repository extends BaseRepository {
  model = AppData

  async get() {
    return this.model.findOne()
  }
}

export default new Repository()
