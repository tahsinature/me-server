import { BaseController } from '@src/controllers/api/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import msgTypes from '@src/constants/msgTypes'
import Connection from '@src/repositories/connection'
import BadRequest from '@src/errors/bad-request'
import Message from '@src/repositories/message'
import telegram from '@src/telegram'

class Controller extends BaseController {
  requestValidationSchema = {
    body: Joi.object({
      content: Joi.string().required(),
      type: Joi.string().valid(...msgTypes),
      // .required(),
    }).required(),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req)

    const { content, type } = req.body
    const { connection } = res.locals

    const data = await this.services.chat.sendMsgToAdmin(connection, { content })

    this.sendResponse(req, res, { data })

    await telegram.sendMsg(`new msg => ${JSON.stringify(data)}`)
  }
}

export default new Controller()
