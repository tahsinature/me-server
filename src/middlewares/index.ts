import socketCheck from '@root/src/middlewares/socketCheck'
import migrateConnection from '@root/src/middlewares/migrateConnection'
import adminAuth from '@root/src/middlewares/adminAuth'
import checkVisitorConnection from '@root/src/middlewares/checkVisitorConnection'

const middlewares = {
  socketCheck,
  migrateConnection,
  adminAuth,
  checkVisitorConnection,
}

export default middlewares
