import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import socket from '@src/socket'

class Controller extends BaseController {
  requestValidationSchema = {}

  requestHandler = async (req: Request, res: Response) => {
    const sockets = socket.getConnectedSockets()

    this.sendResponse(req, res, {
      data: sockets.map(socket => ({
        sid: socket.id,
        connected: socket.connected,
      })),
    })
  }
}

export default new Controller()
