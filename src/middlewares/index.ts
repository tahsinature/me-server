import socketCheck from '@root/src/middlewares/socketCheck'
import migrateConnection from '@root/src/middlewares/migrateConnection'
import logRequest from '@root/src/middlewares/logRequest'
import adminAuth from '@root/src/middlewares/adminAuth'

const middlewares = {
  socketCheck,
  migrateConnection,
  logRequest,
  adminAuth,
}

export default middlewares
