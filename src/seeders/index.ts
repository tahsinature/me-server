import appData from '@src/seeders/appData'
import connection from '@src/seeders/connection'
import message from '@src/seeders/message'
import markdown from '@src/seeders/markdown'

export const seeders = {
  appData,
  connection,
  message,
  markdown,
}

// export = async () => {
//   // const connections = await connection.seed(['::ffff:127.0.0.1'])
//   // await AppData.createOne()
//   // await Message.seed(connections, 10)
//
//   await seeders.markdown.createMany(10)
// }
