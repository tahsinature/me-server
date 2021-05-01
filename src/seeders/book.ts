import Book from '@root/src/models/Book'
import faker from 'faker'

class Seeder {
  public async seed(count: number) {
    await Book.deleteMany({})
    const all = []

    for (const _i of Array(count)) {
      const corporateProductAddon = await this.createOne()
      all.push(corporateProductAddon)
    }

    return all
  }

  public createOne() {
    return Book.create({
      author: faker.name.findName(),
      name: `A book on ${faker.commerce.product()}`,
    })
  }
}

export default new Seeder()
