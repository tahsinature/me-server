import flags from '@root/src/errors/flags'
import sendResponse from '@root/src/utilities/sendResponse'
import { NextFunction, Request, Response } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.ADMIN_SECRET !== req.headers.authorization) return sendResponse(req, res, { status: 401, flag: flags.NOT_ADMIN })

  next()
}
