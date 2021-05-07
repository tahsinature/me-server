import { NextFunction, Request, Response } from 'express'
import { services } from '@root/src/services'

export default async (req: Request, res: Response, next: NextFunction) => {
  const { ip, url, hostname } = req

  await services.connection.saveRequest({ ip, url })

  next()
}
