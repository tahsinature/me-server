import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import msgTypes from '@src/constants/msgTypes'
import Message from '@src/repositories/message'

class Controller extends BaseController {
  requestValidationSchema = {
    body: Joi.object({
      destination: Joi.string().required(),
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

    const { content, type, destination } = req.body
    const { connection } = res.locals

    const msg = await Message.createNew({
      chatId: '',
      author: connection._id.toString(),
      content,
      type,
    })

    res.json({
      _id: msg._id.toString(),
      type: msg.type,
      text: msg.content,
      date: msg.toJSON().createdAt.toString(),
    })
  }
}

export default new Controller()
