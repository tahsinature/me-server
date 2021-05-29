import { ElasticsearchTransport } from 'winston-elasticsearch'

const elkTransport = new ElasticsearchTransport({
  clientOpts: { node: process.env.ELASTICSEARCH_HOST },
  index: `logs-${'http'}`,
})

export default elkTransport
