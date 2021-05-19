import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'

class Controller extends BaseController {
  requestValidationSchema = {}

  requestHandler = async (req: Request, res: Response) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress
    const connection = await this.services.connection.initVisitorConnection(ip)

    this.sendResponse(req, res, { data: connection })
  }
}

export default new Controller()
