import socketIo, { Socket, Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import { instrument } from '@socket.io/admin-ui'

let io: socketIo.Server

class MySocket {
  initSocket = async (server: HttpServer) => {
    io = new Server(server, {
      cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
      },
    })

    instrument(io, { auth: false })

    return io
  }

  getConnectedSockets = async (sidsToFilter?: string[]) => {
    this.makeSureInitDone()

    const allSids = await io.allSockets()

    let connections: Socket[] = []
    allSids.forEach(ele => {
      const socket = io.sockets.sockets.get(ele)
      if (!sidsToFilter) connections.push(socket)
      else if (sidsToFilter.includes(ele)) connections.push(socket)
    })

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
