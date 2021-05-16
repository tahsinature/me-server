import { NextFunction, Request, Response } from 'express'
import { services } from '@root/src/services'

export default async (req: Request, res: Response, next: NextFunction) => {
  const { ip, url, hostname } = req

  console.log(ip)

  await services.connection.saveRequest({ ip: (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress, url })

  next()
}
