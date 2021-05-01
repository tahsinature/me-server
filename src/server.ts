import Container from './container'
import logger from './logger'
import { initSocket } from '@src/socket'
import http from 'http'

class Server {
  constructor(private container: Container) {
    process.on('SIGINT', async () => {
      logger.info('Gracefully shutting down')
      await container.stop().finally(() => process.exit(1))
    })
  }

  public async run() {
    const port = process.env.PORT || 3001
    const server = new http.Server(this.container.app).listen(port)

    initSocket(server)

    server.on('listening', () => {
      console.log('\x1b[36m%s\x1b[0m', `🌏 Express server started at http://localhost:${port}`)
      console.log('\x1b[36m%s\x1b[0m', `⚙️  Swagger UI hosted at http://localhost:${port}/api-docs`)
    })
  }
}

export = Server
