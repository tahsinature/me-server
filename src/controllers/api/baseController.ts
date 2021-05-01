import BadRequest from '@src/errors/bad-request'
import errCodes from '@src/errors/error-codes'
import { Request, RequestHandler } from 'express'
import Joi from 'joi'

interface IRequestValidationSchema {
  body?: Joi.Schema
  query?: Joi.Schema
  header?: Joi.Schema
}

export abstract class BaseController {
  requestValidationSchema: IRequestValidationSchema

  validateRequest = async (req: Request) => {
    const { query, body, headers } = req

    if (this.requestValidationSchema.query)
      await this.requestValidationSchema.query.validateAsync(query).catch(error => {
        throw new BadRequest({ message: error.message, flag: errCodes.INVALID_QUERY_PARAM })
      })

    if (this.requestValidationSchema.body)
      await this.requestValidationSchema.body.validateAsync(body).catch(error => {
        throw new BadRequest({ message: error.message, flag: errCodes.INVALID_BODY })
      })

    if (this.requestValidationSchema.header)
      await this.requestValidationSchema.header.validateAsync(headers, { allowUnknown: true }).catch(error => {
        throw new BadRequest({ message: error.message, flag: errCodes.INVALID_HEADER })
      })
  }

  requestHandler: RequestHandler
}
