import { repositories } from '@src/repositories'
import axios from 'axios'
import _ from 'lodash'
import { isIP } from 'net'

class Service {
  async saveRequest(options: { ip: string; url: string }) {
    let lookUpData = null
    options.ip = _.last(options.ip.split(':'))

    const isValidIPv4 = isIP(options.ip) === 4
    if (isValidIPv4) {
      const { data } = await axios.get(`https://ipapi.co/${options.ip}/json`)
      lookUpData = data
    }

    await repositories.request.createNew({ ip: options.ip, url: options.url, lookUpData })
  }

  async getRequests(query: { ipexclude?: string; after?: string }) {
    let excludeIps: string[] = []

    if (query.ipexclude) excludeIps = query.ipexclude.split(',')

    let data = repositories.request.query({ ips: excludeIps, after: query.after })

    return data
  }
}

export default new Service()
