import bookControllers from '@root/src/controllers/api/book'
import getMsg from '@root/src/controllers/api/chat/getMsg'
import getMsgAdmin from '@root/src/controllers/api/admin/getMsg'
import msgToAdmin from '@root/src/controllers/api/chat/msgToAdmin'
import sendBasicData from '@root/src/controllers/api/data/sendBasicData'
import { Router } from 'express'
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express'
import socketCheck from '@src/middleware/socketCheck'
import init from '@src/controllers/api/admin/init'
import getConnections from '@src/controllers/api/admin/getConnections'
import migrateConnection from '@src/middleware/migrateConnection'
import getSocketConnections from '@src/controllers/api/dev/getSocketConnections'
import removeAllSocketConnections from '@src/controllers/api/dev/removeAllSocketConnections'
import msgToVisitor from '@src/controllers/api/admin/msgToVisitor'
import getMarkdown from '@src/controllers/api/visitor/getMarkdown'
const apiSpec = require('@root/openapi.json')

const swaggerUiOptions: SwaggerUiOptions = { customCss: '.swagger-ui .topbar { display: none }' }

const router = Router()

// Book routes
router.post('/book/add', bookControllers.add.requestHandler)
router.get('/book/all', bookControllers.all.requestHandler)
router.get('/book/search', bookControllers.search.requestHandler)

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions))

const visitorRoutes = Router()
// visitorRoutes.use(socketCheck)
// visitorRoutes.use(migrateConnection.toVisitor)
visitorRoutes.get('/msg', getMsg.requestHandler)
visitorRoutes.post('/msg-to-admin', msgToAdmin.requestHandler)
visitorRoutes.get('/data', sendBasicData.requestHandler)
visitorRoutes.get('/md/:id', getMarkdown.requestHandler)

const adminRoutes = Router()
adminRoutes.use(socketCheck)
adminRoutes.use(migrateConnection.toAdmin)
adminRoutes.post('/init', init.requestHandler)
adminRoutes.get('/connections', getConnections.requestHandler)
adminRoutes.get('/msg', getMsgAdmin.requestHandler)
adminRoutes.post('/msg-to-visitor', msgToVisitor.requestHandler)

const devRoutes = Router()
devRoutes.get('/socket/sids', getSocketConnections.requestHandler)
devRoutes.get('/socket/remove-all-connections', removeAllSocketConnections.requestHandler)

router.use('/admin', adminRoutes)
router.use('/visitor', visitorRoutes)
router.use('/dev', devRoutes)

export default router
