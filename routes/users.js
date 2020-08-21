const router = require('express').Router()

const { catchErr } = require('../errors/errorHandler')
const controller = require('../controllers/userController')
const passport = require('passport')


router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/reset_password_request', controller.reset_password_request)
router.post('/reset_password', controller.reset_password)
router.post('/validate_token', controller.validate_token)
router.get('/me', passport.authenticate('jwt', { session: false }), controller.profile)

module.exports = router