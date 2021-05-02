import logger from '@root/src/logger'
import dotenv from 'dotenv'
const result = dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
if (result.error) console.error(result.error.message)

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'
import flags from '@src/errors/flags'
import morgan from 'morgan'
import cors from 'cors'
// import { closeFirebase } from '@src/firebase'
import router from '@src/router'
import ApplicationError from '@src/errors/application-error'
import MongoConnection from '@src/mongo-connection'

const app = express()
app.use(morgan('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use(cors())

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

  public async load() {
    await this.mongoConnection.connect()
  }

  public async stop() {
    await this.mongoConnection.close()
    // await closeFirebase()
  }
}

export = Container
