import socket from '@root/src/socket'
import Connection, { IConnection, IConnectionDoc } from '@src/models/Connection'

class Repository {
  private model = Connection

  async justFindByIp(ip: string) {
    return this.model.findOne({ ip })
  }

  findOrCreateConnection = async (data: IConnection) => {
    let connection = await this.justFindByIp(data.ip)
    if (!connection) connection = await this.model.create(data)
    return connection
  }

  refreshSocketIds = async () => {
    const connectSids = (await socket.getConnectedSockets()).map(ele => ele.id)
    const connections = await Connection.find()

    for (const connection of connections) {
      if (!connectSids.includes(connection.socketId)) await this.removeSocket(connection)
    }
  }

  async updateSocketId(connection: IConnectionDoc, socketId: string) {
    connection.socketId = socketId
    await connection.save()
  }

  async removeSocket(connectionInstance: IConnectionDoc) {
    connectionInstance.socketId = null
    await connectionInstance.save()
  }

  async updateRole(connection: IConnectionDoc, role: string) {
    connection.role = role
    await connection.save()
  }

  async getAllActive() {
    return Connection.find({ socketId: { $exists: true } })
  }
}

export default new Repository()
