require('../../bin/common')
import mongoose from 'mongoose'
import request from 'supertest'
import Container from '../../src/container'
import flags from '../../src/errors/flags'
import { seeders } from '../../src/seeders'
import { repositories } from '../../src/repositories'
import { models } from '../../src/models'

export class TestPack {
  private container = new Container()
  public app = this.container.app
  public errCodes = flags
  public flags = flags
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

  async resetResources() {
    await this.container.resetResources()
  }

  utility = {
    stringifyDbDoc(doc: mongoose.Document) {
      return JSON.parse(JSON.stringify(doc.toJSON()))
    },
  }
}
