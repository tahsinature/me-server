import { repositories } from '@src/repositories'

class Service {
  async getSingleMarkdown(id: string) {
    const md = await repositories.markdown.getById(id)
    return md
  }
}

export default new Service()
