import getConnections from '@root/src/controllers/api/admin/getConnections'
import getMsg from '@root/src/controllers/api/admin/getMsg'
import init from '@root/src/controllers/api/admin/init'
import msgToVisitor from '@root/src/controllers/api/admin/msgToVisitor'
import addBook from '@root/src/controllers/api/book/addBook'
import getAllBooks from '@root/src/controllers/api/book/getAllBooks'
import searchBook from '@root/src/controllers/api/book/searchBook'
import getChatMsg from '@root/src/controllers/api/chat/getChatMsg'
import msgToAdmin from '@root/src/controllers/api/chat/msgToAdmin'
import sendBasicData from '@root/src/controllers/api/data/sendBasicData'
import getSocketConnections from '@root/src/controllers/api/dev/getSocketConnections'
import removeAllSocketConnections from '@root/src/controllers/api/dev/removeAllSocketConnections'
import getAppStatus from '@root/src/controllers/api/health/getAppStatus'
import getList from '@root/src/controllers/api/visitor/getList'
import getMarkdown from '@root/src/controllers/api/visitor/getMarkdown'

const api = {
  admin: {
    getConnections,
    getMsg,
    init,
    msgToVisitor,
  },
  book: {
    addBook,
    getAllBooks,
    searchBook,
  },
  chat: {
    getChatMsg,
    msgToAdmin,
  },
  data: {
    sendBasicData,
  },
  dev: {
    getSocketConnections,
    removeAllSocketConnections,
  },
  health: {
    getAppStatus,
  },
  visitor: {
    getList,
    getMarkdown,
  },
}

const controllers = {
  api,
}

export default controllers
