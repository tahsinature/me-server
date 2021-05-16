import { IConnectionDoc } from '@root/src/models/Connection'
import { IMessageDoc } from '@root/src/models/Message'
import { repositories } from '@src/repositories'

class Service {
  async getChats(connection: IConnectionDoc) {
    const chats = await repositories.chat.getChatIds(connection.id)

    return chats
  }

  async getMessagesForUser(connection: IConnectionDoc, page = 1) {
    const chats = await repositories.chat.getChatIds([connection._id])
    if (chats.length > 1) throw new Error('multiple chat room detedted')

    const chat = chats[0]
    if (!chat) return []

    const messages = await repositories.message.getByChatId(chat.id, page)

    return this.transformMsgToClientReadable(messages)
  }

  async sendMsgToAdmin(connection: IConnectionDoc, data: { content: string }) {
    const authorId = connection._id
    const chats = await repositories.chat.getChatIds(authorId)

    if (!chats.length) chats.push(await repositories.chat.initWithAdmin(authorId))
    if (chats.length > 1) throw new Error('multiple chat room detedted')
    const messages = await repositories.message.createNew({ author: authorId, chatId: chats[0].id, content: data.content, type: 'text' })

    return this.transformMsgToClientReadable([messages])[0]
  }

  public transformMsgToClientReadable = (messages: IMessageDoc[]) => {
    return messages.map(msg => ({
      author: msg.author === 'admin' ? 'admin' : 'visitor',
      content: msg.content,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
    }))
  }
}

export default new Service()
