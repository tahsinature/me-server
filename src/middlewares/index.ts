import socketCheck from '@root/src/middlewares/socketCheck'
import migrateConnection from '@root/src/middlewares/migrateConnection'
import logRequest from '@root/src/middlewares/logRequest'

const middlewares = {
  socketCheck,
  migrateConnection,
  logRequest,
}

export default middlewares
