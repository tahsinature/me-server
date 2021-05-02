import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import AppData from '@src/repositories/appData'

class Controller extends BaseController {
  requestValidationSchema = {
    body: Joi.object({}).required(),
    query: Joi.object({}).required(),
    header: Joi.object({}).required(),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const data = await AppData.get()

    res.status(200).json(data)
  }
}

export default new Controller()
