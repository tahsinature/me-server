import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import AppData from '@src/repositories/appData'
import Connection from '@src/repositories/connection'
import connectionRoles from '@src/constants/connectionRoles'

class Controller extends BaseController {
  requestValidationSchema = {
    body: Joi.object({}).required(),
    query: Joi.object({}).required(),
    header: Joi.object({}).required(),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const connections = await Connection.getAllActive()
    const data = connections.map(ele => ({
      _id: ele._id.toString(),
      ip: ele.ip,
      socketId: ele.socketId,
      role: ele.role,
    }))

    res.json(data)
  }
}

export default new Controller()
