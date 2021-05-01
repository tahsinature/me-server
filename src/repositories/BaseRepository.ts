import { Model } from 'mongoose'

export abstract class BaseRepository {
  abstract model: Model<any>
}
