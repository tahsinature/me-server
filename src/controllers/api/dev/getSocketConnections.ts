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
    res.json(io.sockets.adapter.sids)
  }
}

export default new Controller()
