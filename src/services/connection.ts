import connectionRoles from '@root/src/constants/connectionRoles'
import { repositories } from '@src/repositories'
import axios from 'axios'
import _ from 'lodash'
import { isIP } from 'net'
import { IConnectionDoc } from '@src/models/Connection'

class Service {
  async initVisitorConnection(connectionId: string, ip: string) {
    const isNewConnection = !(await this.doesConnectionExists(connectionId))
    const connection = await repositories.connection.findOrCreateConnectionById(connectionId)
    await repositories.connection.updateIpInfo(connection, ip)

    return { connection, isNewConnection }
  }

  async doesConnectionExists(connectionId: string) {
    const connection = await repositories.connection.findById(connectionId)
    return Boolean(connection)
  }

  async getConnections(options: { excludedIps: string[] }) {
    const connections = await repositories.connection.getAll({ excludedIps: options.excludedIps })
    return connections.map(ele => ({
      _id: ele._id.toString(),
      ip: ele.ip,
      name: ele.name,
      socketId: ele.socketId,
      lookUpData: ele.lookUpData,
      role: ele.role,
      createdAt: ele.createdAt,
    }))
  }

  async getRequests(query: { ipexclude?: string; after?: string; compact?: boolean }) {
    let excludeIps: string[] = []

    if (query.ipexclude) excludeIps = query.ipexclude.split(',')

    let data = await repositories.request.query({ ips: excludeIps, after: query.after })

    if (query.compact)
      data = data.map(ele => {
        const transformed = { ...ele.toJSON() }

        if (ele.lookUpData) {
          Object.assign(transformed, { country: ele.lookUpData.country_name, city: ele.lookUpData.city })
        }
        delete transformed.lookUpData

        return transformed as any
      })

    return data
  }
}

export default new Service()
