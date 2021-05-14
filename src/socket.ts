import socketIo, { Socket } from 'socket.io'
import { Server as HttpServer } from 'http'
import controllers from '@root/src/controllers'

let io: socketIo.Server

class MySocket {
  initSocket = (server: HttpServer) => {
    io = socketIo(server)
    io.on('connection', async socket => {
      const socketId = socket.id
      const { headers, address } = socket.handshake

      console.log(address)

      const connection = await controllers.socket.handleNewConnection({
        ip: address,
        meta: headers,
        socketId,
      })

      socket.emit('SOCKET_CONNECTED')

      socket.on('disconnect', () => controllers.socket.handleDisconnect(connection))
    })
  }

  getConnectedSockets = (sids?: string[]) => {
    this.makeSureInitDone()

    let connections: Socket[] = Object.values(io.sockets.connected)
    if (sids) connections = connections.filter(ele => sids.includes(ele.id))

    return connections
  }

  disconnectSockets = (sockets: Socket[]) => {
    for (const socket of sockets) {
      socket.disconnect()
    }
  }

  getIO = () => {
    this.makeSureInitDone()
    return io
  }

  private makeSureInitDone = () => {
    if (!io) throw new Error('io not initialized')
  }
}

export default new MySocket()
