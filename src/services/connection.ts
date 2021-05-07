import { services } from '@root/src/services'
import { repositories } from '@src/repositories'
import axios from 'axios'

class Service {
  async saveRequest(options: { ip: string; url: string }) {
    const { data } = await axios.get(`https://ipapi.co/${options.ip}/json`)

    await repositories.request.createNew({ ip: options.ip, url: options.url, lookUpData: data })

    // console.log(data)
  }
}

export default new Service()
