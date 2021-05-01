import AppData from '@root/src/seeders/AppData'
import Connection from '@src/seeders/Connection'
import Message from '@src/seeders/Message'
import Markdown from '@src/seeders/Markdown'

export = async () => {
  // const connections = await Connection.seed(['::ffff:127.0.0.1'])
  // await AppData.createOne()
  // await Message.seed(connections, 10)

  await Markdown.createMany(10)
}
