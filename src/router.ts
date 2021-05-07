import { Router } from 'express'
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express'
import sendResponse from '@src/utilities/sendResponse'
import middlewares from '@root/src/middlewares'
import controllers from '@root/src/controllers'

const apiSpec = require('@root/openapi.json')
const swaggerUiOptions: SwaggerUiOptions = { customCss: '.swagger-ui .topbar { display: none }' }
const router = Router()

router.get('/health', (req, res) => {
  sendResponse(req, res, { data: { status: 'OK' } })
})

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions))

const bookRouts = Router()
bookRouts.post('/add', controllers.api.book.addBook.requestHandler)
bookRouts.get('/all', controllers.api.book.getAllBooks.requestHandler)
bookRouts.get('/search', controllers.api.book.searchBook.requestHandler)

const visitorRoutes = Router()
// visitorRoutes.use(middlewares.socketCheck)
// visitorRoutes.use(middlewares.migrateConnection.toVisitor)
visitorRoutes.get('/msg', controllers.api.chat.getChatMsg.requestHandler)
visitorRoutes.post('/msg-to-admin', controllers.api.chat.msgToAdmin.requestHandler)
visitorRoutes.get('/basic-data', controllers.api.data.sendBasicData.requestHandler)
visitorRoutes.get('/list/:type', controllers.api.visitor.getList.requestHandler)
visitorRoutes.get('/md/:id', controllers.api.visitor.getMarkdown.requestHandler)

const adminRoutes = Router()
// adminRoutes.use(socketCheck)
// adminRoutes.use(migrateConnection.toAdmin)
adminRoutes.post('/init', controllers.api.admin.init.requestHandler)
adminRoutes.get('/connections', controllers.api.admin.getConnections.requestHandler)
adminRoutes.get('/msg', controllers.api.admin.getMsg.requestHandler)
adminRoutes.post('/msg-to-visitor', controllers.api.admin.msgToVisitor.requestHandler)

const devRoutes = Router()
devRoutes.get('/socket/sids', controllers.api.dev.getSocketConnections.requestHandler)
devRoutes.get('/socket/remove-all-connections', controllers.api.dev.removeAllSocketConnections.requestHandler)

router.use('/admin', adminRoutes)
router.use('/visitor', visitorRoutes)
router.use('/dev', devRoutes)
router.use('/book', bookRouts)

export default router
