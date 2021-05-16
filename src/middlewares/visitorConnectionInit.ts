import { NextFunction, Request, Response } from 'express'
import { repositories } from '@root/src/repositories'

export default async (req: Request, res: Response, next: NextFunction) => {
  const { ip } = req

  const connection = await repositories.connection.findOrCreateConnection({ ip })
  res.locals.connection = connection

  next()
}
