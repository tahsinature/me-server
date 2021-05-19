import connectionRoles from '@root/src/constants/connectionRoles'
import { repositories } from '@src/repositories'
import axios from 'axios'
import _ from 'lodash'
import { isIP } from 'net'

class Service {
  async initVisitorConnection(ip: string) {
    let lookUpData = null
    ip = _.last(ip.split(':'))

    const isValidIPv4 = isIP(ip) === 4
    if (isValidIPv4) {
      const { data } = await axios.get(`https://ipapi.co/${ip}/json`)
      lookUpData = data
    }

    const connection = await repositories.connection.findOrCreateConnection({ ip, role: connectionRoles.visitor })

    return connection
  }

  async doesConnectionExists(connectionId: string) {
    const connection = await repositories.connection.findById(connectionId)
    return Boolean(connection)
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
