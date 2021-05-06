import appData from '@src/seeders/appData'
import connection from '@src/seeders/connection'
import message from '@src/seeders/message'
import markdown from '@src/seeders/markdown'
import tool from '@src/seeders/tool'

export const seeders = {
  appData,
  connection,
  message,
  markdown,
  tool,
}

export const seed = async () => {
  // const connections = await connection.seed(['::ffff:127.0.0.1'])
  // await AppData.createOne()
  // await Message.seed(connections, 10)

  // await seeders.markdown.createMany(10)
  await seeders.tool.createStatic()
}
