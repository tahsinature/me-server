import socketCheck from '@root/src/middlewares/socketCheck'
import migrateConnection from '@root/src/middlewares/migrateConnection'

const middlewares = {
  socketCheck,
  migrateConnection,
}

export default middlewares
