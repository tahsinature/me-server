import { repositories } from '@root/src/repositories'
import socket from '@root/src/socket'

class SocketController {
  async handle(options: { socketId: string; meta: any; ip: string }) {
    const previousConnection = await repositories.connection.justFindByIp(options.ip)
    if (previousConnection) {
      const socketWithPreviousConnection = (await socket.getConnectedSockets([previousConnection.socketId]))[0]
      if (socketWithPreviousConnection) socket.disconnectSockets([socketWithPreviousConnection])
    }

    const connection = await repositories.connection.findOrCreateConnection({ ip: options.ip })
    await repositories.connection.updateSocketId(connection, options.socketId)

    console.log(`connection created: ${connection.socketId}`)

    return connection
  }
}

export default new SocketController()
