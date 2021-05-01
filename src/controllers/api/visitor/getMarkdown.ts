import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import Markdown from '@src/repositories/Markdown'

class Controller extends BaseController {
  requestValidationSchema = {}

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)
    console.log(req.params.id)

    const data = await Markdown.getAll()

    res.status(200).json(data)
  }
}

export default new Controller()
