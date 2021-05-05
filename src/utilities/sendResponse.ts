import { Request, Response } from 'express'
import Joi from 'joi'

interface IDataToSend {
  requestId: string
  errors: string[]
  data: any
  message: string
  flag?: string
}

const sendResponse = (
  req: Request,
  res: Response,
  option: {
    data: any
    flag?: string
    message?: string
    error?: Error
    joiError?: Joi.ValidationError
    status?: 200 | 400 | 401 | 500
  } = {
    data: null,
  },
) => {
  const errMsgs: string[] = []
  if (option.error) errMsgs.push(option.error.message)
  // do something with error.stack

  if (option.joiError) errMsgs.concat(option.joiError.details.map(ele => ele.message))

  const dataToSend: IDataToSend = {
    requestId: '1234', // later will  taken from request obj
    errors: errMsgs,
    data: option.data,
    message: option.message || 'success',
    flag: option.flag,
  }

  res.status(option.status || 200).send(dataToSend)
}

export default sendResponse
