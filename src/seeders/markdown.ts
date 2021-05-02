import Markdown from '@root/src/models/Markdown'
import faker from 'faker'

class Seeder {
  public async createMany(count: number) {
    await Markdown.deleteMany({})
    const all = []

    for (const _i of Array(count)) {
      const data = await this.createOne({})
      all.push(data)
    }

    return all
  }

  public createOne({
    title = faker.lorem.words(5),
    content = `######test content\n${faker.lorem.sentences(10)}`,
    description = faker.lorem.sentences(3),
  }: {
    title?: string
    content?: string
    description?: string
  }) {
    return Markdown.create({
      content,
      title,
      description,
    })
  }
}

export default new Seeder()
