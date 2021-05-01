import socketIo from 'socket.io'
import { Server as HttpServer } from 'http'
import handleNewConnection from '@src/controllers/socket/handleNewConnection'
import handleDisconnect from '@src/controllers/socket/handleDisconnect'

let io: socketIo.Server

export const initSocket = (server: HttpServer) => {
  io = socketIo(server)

  io.on('connection', async socket => {
    const socketId = socket.id
    const { headers, address } = socket.handshake

    const connection = await handleNewConnection({
      ip: address,
      meta: headers,
      socketId,
    })

    socket.emit('SOCKET_CONNECTED')

    socket.on('disconnect', () => handleDisconnect(connection))
  })
}

export const getIO = () => {
  if (!io) throw new Error('io not initialized')
  return io
}
