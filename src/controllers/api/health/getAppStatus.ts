import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'

class Controller extends BaseController {
  requestValidationSchema = {}

  requestHandler = async (req: Request, res: Response) => {
    this.sendResponse(req, res, { data: { status: 'OK' } })
  }
}

export default new Controller()
