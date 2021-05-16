import socketCheck from '@root/src/middlewares/socketCheck'
import migrateConnection from '@root/src/middlewares/migrateConnection'
import logRequest from '@root/src/middlewares/logRequest'
import adminAuth from '@root/src/middlewares/adminAuth'
import visitorConnectionInit from '@root/src/middlewares/visitorConnectionInit'

const middlewares = {
  socketCheck,
  migrateConnection,
  logRequest,
  adminAuth,
  visitorConnectionInit,
}

export default middlewares
