import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'

class Controller extends BaseController {
  requestValidationSchema = {}

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const data = await this.services.basicData.getBasicData()

    this.sendResponse(req, res, { data })
  }
}

export default new Controller()
