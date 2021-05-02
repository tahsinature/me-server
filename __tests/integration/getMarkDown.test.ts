import { TestPack } from '../utility/testPack'

const tp = new TestPack()

beforeAll(async () => await tp.loadContainer())
afterAll(async () => await tp.stopContainer())

const getURL = (id: string) => `/visitor/md/${id}`

describe('get markdown api', () => {
  it('test list first test', async () => {
    // const res = await request(container.app).get(url)
    const res = await tp.request(tp.app).get(getURL('foo'))

    console.log(res.body)

    // expect(res.status).toBe(400)
    // expect(res.body.flag).toBe(errCodes.SOCKET_CONNECTION_NOT_FOUND)
  })
})
