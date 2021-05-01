import Connection from '@root/src/models/Connection'
import faker from 'faker'

class Seeder {
  public async seed(ips?: string[]) {
    if (ips) ips = Array.from({ length: 3 }, () => faker.internet.ip())
    await Connection.deleteMany({})
    const all = []

    for (const ip of ips) {
      const data = await this.createOne(ip)
      all.push(data)
    }

    return all
  }

  public createOne(ip: string) {
    return Connection.create({
      ip,
      socketId: faker.random.uuid(),
    })
  }
}

export default new Seeder()
