import Container from '../../src/container'
import request from 'supertest'
import { request as expressRequest } from 'express'
import Connection from '../../src/seeders/connection'
import Message from '../../src/seeders/message'
import flags from '../../src/errors/flags'

const container = new Container()

beforeAll(async () => await container.load())
afterAll(async () => await container.stop())

const url = '/msg'

describe('Foo', () => {
  it('should get SOCKET_CONNECTION_NOT_FOUND err', async () => {
    const res = await request(container.app).get(url)

    expect(res.status).toBe(400)
    expect(res.body.flag).toBe(flags.SOCKET_CONNECTION_NOT_FOUND)
  })

  it('foo', async () => {
    const connection = await Connection.createOne('0.0.0.0')
    const msgs = await Message.seed([connection], 5)

    jest.spyOn(expressRequest, 'ip', 'get').mockReturnValue(connection.ip)
    const res = await request(container.app).get(url)

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(
      msgs.map(ele => ({
        type: ele.type,
        text: ele.content,
        date: ele.toJSON().createdAt.toString(),
      })),
    )
  })
})
