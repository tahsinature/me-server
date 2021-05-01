import Connection from '@src/repositories/Connection'

export default async (options: { socketId: string; meta: any; ip: string }) => {
  const connection = await Connection.findOrCreateConnection({
    ip: options.ip,
  })

  await Connection.updateSocketId(connection, options.socketId)

  console.log(`connection created: ${connection.socketId}`)

  return connection
}
