import { createLogger, format, transports } from 'winston'

const consoleTransport = new transports.Console({
  level: 'debug',
  format: format.prettyPrint(),
})

const fileTransport = new transports.File({
  level: 'error',
  filename: './logs/error.log',
  format: format.json({
    replacer: (key, value) => {
      if (key === 'error') {
        return {
          message: (value as Error).message,
          stack: (value as Error).stack,
        }
      }
      return value
    },
  }),
})

const logger = createLogger({
  format: format.combine(format.timestamp()),
  transports: [fileTransport, ...(process.env.NODE_ENV === 'development' ? [consoleTransport] : [])],
  defaultMeta: { service: 'api' },
})

export default logger
