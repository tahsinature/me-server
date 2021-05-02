import Message from '@root/src/models/Message'
import faker from 'faker'
import { IConnectionDoc } from '@src/models/Connection'

class Seeder {
  public async seed(connections: IConnectionDoc[], count: number) {
    await Message.deleteMany({})
    const all = []

    for (const connection of connections) {
      for (const _i of Array(count)) {
        const data = await this.createOne(connection)
        all.push(data)
      }
    }

    return all
  }

  public createOne(connection: IConnectionDoc) {
    return Message.create({
      content: faker.lorem.words(5),
      type: 'text',
      author: connection.id.toString(),
    })
  }
}

export default new Seeder()
