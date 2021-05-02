import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'

class Controller extends BaseController {
  requestValidationSchema = {}

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)
    const { id } = req.params
    await this.checkIfUrlParamIsObjectId(id)

    const data = await this.services.markdown.getSingleMarkdown(id)

    res.status(200).json(data)
  }
}

export default new Controller()
