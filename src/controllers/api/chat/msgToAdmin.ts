import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import msgTypes from '@src/constants/msgTypes'
import Connection from '@src/repositories/Connection'
import BadRequest from '@src/errors/bad-request'
import Message from '@src/repositories/Message'

class Controller extends BaseController {
  requestValidationSchema = {
    body: Joi.object({
      content: Joi.string().required(),
      type: Joi.string()
        .valid(...msgTypes)
        .required(),
    }).required(),
    query: Joi.object({}).required(),
    header: Joi.object({}).required(),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const { content, type } = req.body
    const { connection } = res.locals

    const msg = await Message.createNew({
      destination: 'admin',
      author: connection._id.toString(),
      content,
      type,
    })

    res.json({
      type: msg.type,
      text: msg.content,
      isAdmin: msg.author === 'admin',
      date: msg.toJSON().createdAt.toString(),
    })
  }
}

export default new Controller()
