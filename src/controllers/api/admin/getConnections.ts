import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import connection from '@root/src/services/connection'

class Controller extends BaseController {
  requestValidationSchema = {}

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const data = await connection.getConnections()

    this.sendResponse(req, res, { data })
  }
}

export default new Controller()
