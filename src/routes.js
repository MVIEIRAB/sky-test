const express = require('express')

const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controller/UserController')
const sessionController = require('./app/controller/sessionController')

const router = express.Router()

router.post('/sign_up', UserController.register)
router.post('/sign_in', UserController.authenticate)

router.use(authMiddleware)

router.get('/session', sessionController.session)

module.exports = router