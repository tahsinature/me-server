import mongoose, { ConnectionOptions } from 'mongoose'
import logger from './logger'
mongoose.Promise = global.Promise

export default class MongoConnection {
  private mongoUrl = process.env.MONGO_URL
  private isConnectedBefore: boolean = false

  private readonly mongoConnectionOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  constructor() {
    mongoose.set('debug', process.env.NODE_ENV === 'development')

    mongoose.connection.on('error', this.onError)
    mongoose.connection.on('disconnected', this.onDisconnected)
    mongoose.connection.on('connected', this.onConnected)
    mongoose.connection.on('reconnected', this.onReconnected)
  }

  public async close() {
    logger.log({ level: 'info', message: 'Closing the MongoDB connection' })
    await mongoose.connection.close(error => {
      if (error) logger.log({ level: 'error', message: 'Error shutting closing mongo connection', error })
      process.exit(0)
    })
  }

  public async connect() {
    logger.log({ level: 'info', message: `Connecting to MongoDB at ${this.mongoUrl}` })
    await mongoose.connect(this.mongoUrl, this.mongoConnectionOptions).catch(() => {})
  }

  private onConnected = () => {
    logger.log({ level: 'info', message: `Connected to MongoDB at ${this.mongoUrl}` })
    this.isConnectedBefore = true
  }

  private onReconnected = () => {
    logger.log({
      level: 'info',
      message: 'Reconnected to MongoDB',
    })
  }

  private onError = () => {
    logger.log({ level: 'error', message: `Could not connect to ${this.mongoUrl}` })
  }

  private onDisconnected = () => {
    if (!this.isConnectedBefore) {
      setTimeout(async () => {
        await this.connect()
      }, 2000)
      logger.log({ level: 'info', message: 'Retrying mongo connection' })
    }
  }
}
