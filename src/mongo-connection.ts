import mongoose, { ConnectionOptions } from 'mongoose'
import logger from './logger'
mongoose.Promise = global.Promise

export default class MongoConnection {
  private mongoUrl = process.env.MONGO_URL
  private isConnectedBefore: boolean = false

  private readonly mongoConnectionOptions: ConnectionOptions = {
    dbName: process.env.MONGO_DB_NAME,
    pass: process.env.MONGO_DB_PASS,
    user: process.env.MONGO_DB_USER,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }

  constructor(mongoUrl: string, dbName: string, user: string, pass: string) {
    if (!mongoUrl || !dbName) throw new Error(`mongoUrl & dbname both required`)
    mongoose.set('debug', process.env.NODE_ENV === 'development')
    if (process.env.NODE_ENV === 'test') this.mongoConnectionOptions.dbName = this.mongoConnectionOptions.dbName + '_test'

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
