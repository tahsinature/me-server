import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import { getIO } from '@src/socket'

class Controller extends BaseController {
  requestValidationSchema = {
    body: Joi.object({}).required(),
    query: Joi.object({}).required(),
    header: Joi.object({}).required(),
  }

  requestHandler = async (req: Request, res: Response) => {
    const io = getIO()
    const connections = Object.values(io.of('/').connected)
    console.log(connections)
    for (const connection of connections) {
      connection.disconnect()
    }

    res.status(204).end()
  }
}

export default new Controller()
