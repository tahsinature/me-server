import { BaseRepository } from '@src/repositories/baseRepository'
import Connection, { IConnection, IConnectionDoc } from '@src/models/Connection'

class Repository extends BaseRepository {
  model = Connection

  async justFindByIp(ip: string) {
    return this.model.findOne({ ip })
  }

  async findOrCreateConnection(data: IConnection) {
    let connection = await this.justFindByIp(data.ip)
    if (!connection) connection = await this.model.create(data)
    return connection
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
