import Connection from '@src/repositories/Connection'
import connectionRoles from '@src/constants/connectionRoles'
import { NextFunction, Request, Response } from 'express'

const toAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { connection } = res.locals
  if (!connection) throw new Error('found a request without connection in res.locals')

  await Connection.updateRole(connection, connectionRoles.admin)

  next()
}

const toVisitor = async (req: Request, res: Response, next: NextFunction) => {
  const { connection } = res.locals
  if (!connection) throw new Error('found a request without connection in res.locals')

  await Connection.updateRole(connection, connectionRoles.visitor)

  next()
}

export default {
  toAdmin,
  toVisitor,
}
