import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import Message from '@src/repositories/message'

class Controller extends BaseController {
  requestValidationSchema = {
    body: Joi.object({}).required(),
    query: Joi.object({}).required(),
    header: Joi.object({}).required(),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const data = await Message.getAllVisitorMsgsForAdmin()

    res.json(data)
  }
}

export default new Controller()
