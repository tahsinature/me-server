import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import Connection from '@src/repositories/Connection'
import BadRequest from '@src/errors/bad-request'
import Message from '@root/src/repositories/Message'
import errCodes from '@root/src/errors/error-codes'

class Controller extends BaseController {
  requestValidationSchema = {
    body: Joi.object({}).required(),
    query: Joi.object({}).required(),
    header: Joi.object({}).required(),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const connection = await Connection.justFindByIp(req.ip)
    if (!connection) throw new BadRequest({ message: "can't get msg before initializing socket connection", flag: errCodes.SOCKET_CONNECTION_NOT_FOUND })

    const msgs = await Message.getAll(connection._id)

    const data = msgs.map(ele => ({
      type: ele.type,
      text: ele.content,
      isAdmin: ele.author === 'admin',
      date: ele.toJSON().createdAt.toString(),
    }))

    res.json(data)
  }
}

export default new Controller()
