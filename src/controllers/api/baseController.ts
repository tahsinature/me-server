import BadRequest from '@src/errors/bad-request'
import errCodes from '@src/errors/error-codes'
import { Request, RequestHandler } from 'express'
import Joi from 'joi'
import mongoose from 'mongoose'
import { services } from '@src/services'

interface IRequestValidationSchema {
  body?: Joi.Schema
  query?: Joi.Schema
  header?: Joi.Schema
}

export abstract class BaseController {
  public requestValidationSchema: IRequestValidationSchema
  public services = services

  async validateRequest(req: Request) {
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

  async checkIfUrlParamIsObjectId(param: string) {
    const isValid = mongoose.isValidObjectId(param)
    if (!isValid) throw new BadRequest({ flag: errCodes.INVALID_URL_PARAM, message: 'url param is not valid object id' })
  }

  requestHandler: RequestHandler
}
