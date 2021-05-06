import Tool from '@root/src/models/Tool'
import faker from 'faker'
import data from './data'

class Seeder {
  public async createMany(count: number) {
    await Tool.deleteMany({})
    const all = []

    for (const _i of Array(count)) {
      const data = await this.createOne({})
      all.push(data)
    }

    return all
  }

  public createOne({
    title = faker.lorem.words(5),
    description = faker.lorem.sentences(3),
    image = faker.internet.avatar(),
    display = false,
    url = faker.internet.url(),
  }: {
    title?: string
    description?: string
    image?: string
    display?: boolean
    url?: string
  }) {
    return Tool.create({
      title,
      description,
      image,
      display,
      url,
    })
  }

  public async createStatic() {
    const all = await Tool.insertMany(data.tools)
    return all
  }
}

export default new Seeder()
