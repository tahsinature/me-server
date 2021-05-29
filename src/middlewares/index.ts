import socketCheck from '@root/src/middlewares/socketCheck'
import migrateConnection from '@root/src/middlewares/migrateConnection'
import adminAuth from '@root/src/middlewares/adminAuth'
import checkVisitorConnection from '@root/src/middlewares/checkVisitorConnection'
import logHttp from '@root/src/middlewares/logHttp'

const middlewares = {
  socketCheck,
  migrateConnection,
  adminAuth,
  checkVisitorConnection,
  logHttp,
}

export default middlewares
