import { TestPack } from '../utility/testPack'

const tp = new TestPack()

beforeAll(async () => await tp.loadContainer())
afterAll(async () => await tp.stopContainer())

const url = '/visitor/list'

describe('Foo', () => {
  it('should get SOCKET_CONNECTION_NOT_FOUND err', async () => {
    // const res = await request(container.app).get(url)
    const res = await tp.request(tp.app).get(url)

    console.log(res.body)

    // expect(res.status).toBe(400)
    // expect(res.body.flag).toBe(errCodes.SOCKET_CONNECTION_NOT_FOUND)
  })
})
