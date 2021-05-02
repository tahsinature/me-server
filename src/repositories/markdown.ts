import Markdown from '@src/models/Markdown'

class Repository {
  private model = Markdown

  getAll() {
    return this.model.find()
  }
}

export default new Repository()
