import logger from '@root/src/logger'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import compression from 'compression'
import path from 'path'
import flags from '@src/errors/flags'
import morgan from 'morgan'
import cors from 'cors'
// import { closeFirebase } from '@src/firebase'
import router from '@src/router'
import ApplicationError from '@src/errors/application-error'
import MongoConnection from '@src/mongo-connection'
import { seed } from '@src/seeders'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

app.use(router)

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err)

  if (err instanceof ApplicationError) res.status(err.status).json(err)
  else {
    res.status(500).json(new ApplicationError({ flag: flags.INTERNAL_SERVER_ERROR, httpCode: 500 }))
    logger.log({ level: 'error', message: 'Error in request handler', error: err })
  }
})

class Container {
  public readonly app = app
  private readonly mongoConnection = new MongoConnection()
  public seed = seed

  public async load() {
    await this.mongoConnection.connect()
  }

  public async stop() {
    await this.mongoConnection.close()
    // await closeFirebase()
  }

  public async resetResources() {
    await this.mongoConnection.dropMongoDB()
  }
}

export = Container
