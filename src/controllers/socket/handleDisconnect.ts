import Connection from '@src/repositories/Connection'
import { IConnectionDoc } from '@src/models/Connection'

export default async (connection: IConnectionDoc) => {
  const { socketId } = connection
  await Connection.removeSocket(connection)

  console.log(`${socketId} disconnected`)
}
