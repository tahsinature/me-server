import Request, { IRequest } from '@root/src/models/Request'

class Repository {
  private model = Request

  createNew(data: IRequest) {
    return this.model.create(data)
  }
}

export default new Repository()
