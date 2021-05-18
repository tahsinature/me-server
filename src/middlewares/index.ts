import socketCheck from '@root/src/middlewares/socketCheck'
import migrateConnection from '@root/src/middlewares/migrateConnection'
import logRequest from '@root/src/middlewares/logRequest'
import adminAuth from '@root/src/middlewares/adminAuth'
import checkVisitorConnection from '@root/src/middlewares/checkVisitorConnection'

const middlewares = {
  socketCheck,
  migrateConnection,
  logRequest,
  adminAuth,
  checkVisitorConnection,
}

export default middlewares
