import Container from '../../src/container'
import request from 'supertest'
import errCodes from '../../src/errors/error-codes'
import { seeders } from '../../src/seeders'
import { repositories } from '../../src/repositories'
import { models } from '../../src/models'

export class TestPack {
  private container = new Container()
  public errCodes = errCodes
  public flags = errCodes
  public request = request
  public seeders = seeders
  public repositories = repositories
  public models = models

  async loadContainer() {
    await this.container.load()
  }

  async stopContainer() {
    await this.container.stop()
  }
}
