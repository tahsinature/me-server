import { createLogger, format, transports } from 'winston'
import fileTransport from '@root/src/logger/transports/fileTransport'
import consoleTransport from '@root/src/logger/transports/consoleTransport'
import elkTransport from '@root/src/logger/transports/elkTransport'

const logger = createLogger({
  format: format.combine(format.timestamp()),
  transports: [fileTransport, ...(process.env.NODE_ENV === 'development' ? [consoleTransport] : [])],
  defaultMeta: { service: 'api' },
})

export const httpLogger = createLogger({
  format: format.combine(format.timestamp()),
  transports: [elkTransport],
  defaultMeta: { service: 'api' },
})

export default logger
