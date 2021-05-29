import { ElasticsearchTransport } from 'winston-elasticsearch'

const elkTransport = new ElasticsearchTransport({
  clientOpts: { node: 'https://wuia3ursgh:3f2wx4n3rc@me-server-8414750834.us-east-1.bonsaisearch.net:443' },
  index: `logs-${'http'}`,
})

export default elkTransport
