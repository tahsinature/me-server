import { Router } from 'express'
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express'
import middlewares from '@root/src/middlewares'
import controllers from '@root/src/controllers'
import { Server } from 'socket.io'

const apiSpec = require('@root/openapi.json')
const swaggerUiOptions: SwaggerUiOptions = { customCss: '.swagger-ui .topbar { display: none }' }
const router = Router()

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions))

const healthRoutes = Router()
healthRoutes.get('/', controllers.api.health.getAppStatus.requestHandler)

const bookRouts = Router()
bookRouts.post('/add', controllers.api.book.addBook.requestHandler)
bookRouts.get('/all', controllers.api.book.getAllBooks.requestHandler)
bookRouts.get('/search', controllers.api.book.searchBook.requestHandler)

const visitorRoutes = Router()
visitorRoutes.get('/connection', controllers.api.visitor.connection.requestHandler)
visitorRoutes.use(middlewares.logRequest, middlewares.checkVisitorConnection)
// visitorRoutes.use(middlewares.socketCheck)
// visitorRoutes.use(middlewares.migrateConnection.toVisitor)
visitorRoutes.get('/chats', controllers.api.chat.getChats.requestHandler)
visitorRoutes.get('/chats/:chatId', controllers.api.chat.getMsgs.requestHandler)
visitorRoutes.get('/messages', controllers.api.chat.getMsgs.requestHandler)
visitorRoutes.post('/messages', controllers.api.chat.msgToAdmin.requestHandler)
visitorRoutes.get('/basic-data', controllers.api.data.sendBasicData.requestHandler)
visitorRoutes.get('/list/:type', controllers.api.visitor.getList.requestHandler)
visitorRoutes.get('/md/:id', controllers.api.visitor.getMarkdown.requestHandler)

const adminRoutes = Router()
// adminRoutes.use(socketCheck)
// adminRoutes.use(migrateConnection.toAdmin)
adminRoutes.use(middlewares.adminAuth)
adminRoutes.get('/requests', controllers.api.admin.getRequests.requestHandler)
adminRoutes.post('/init', controllers.api.admin.init.requestHandler)
adminRoutes.get('/connections', controllers.api.admin.getConnections.requestHandler)
adminRoutes.get('/msg', controllers.api.admin.getMsg.requestHandler)
adminRoutes.post('/msg-to-visitor', controllers.api.admin.msgToVisitor.requestHandler)

const devRoutes = Router()
devRoutes.get('/socket/sids', controllers.api.dev.getSocketConnections.requestHandler)
devRoutes.post('/socket/remove-connections', controllers.api.dev.removeAllSocketConnections.requestHandler)
devRoutes.post('/socket/emit', controllers.api.dev.emitSocketEvent.requestHandler)

router.use('/health', healthRoutes)
router.use('/admin', adminRoutes)
router.use('/visitor', visitorRoutes)
router.use('/dev', devRoutes)
router.use('/book', bookRouts)

/**
 * socket
 */
export const initSocketRouts = async (io: Server) => {
  io.on('connection', async socket => {
    const socketId = socket.id
    const { headers, address } = socket.handshake

    const connection = await controllers.socket.handleNewConnection.handle({
      ip: address,
      meta: headers,
      socketId,
    })

    socket.emit('SOCKET_CONNECTED')

    socket.on('disconnect', () => controllers.socket.handleDisconnect.handle(connection))
  })
}

export default router
