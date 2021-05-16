import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Connection from '@src/repositories/connection'
import BadRequest from '@src/errors/bad-request'
import flags from '@src/errors/flags'

class Controller extends BaseController {
  requestValidationSchema = {}

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const connection = await Connection.justFindByIp(req.ip)
    if (!connection) throw new BadRequest({ message: "can't get msg before initializing socket connection", flag: flags.SOCKET_CONNECTION_NOT_FOUND })

    const data = await this.services.chat.getChats(connection)

    this.sendResponse(req, res, { data })
  }
}

export default new Controller()
