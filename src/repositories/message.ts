import Message, { IMessage } from '@src/models/Message'

class Repository {
  private model = Message

  createNew(data: IMessage) {
    return Message.create(data)
  }

  getAll(authorId: string) {
    return Message.find({ author: authorId })
  }

  getAllVisitorMsgsForAdmin() {
    return Message.aggregate([
      {
        $group: {
          _id: {
            author: '$author',
          },
          msgs: {
            $push: {
              _id: '$_id',
              type: '$type',
              content: '$content',
              createdAt: '$createdAt',
            },
          },
        },
      },
    ])
  }
}

export default new Repository()
