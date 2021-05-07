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
}

export default new Service()
