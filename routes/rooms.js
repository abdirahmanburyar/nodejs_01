const router = require('express').Router()

const { catchErr } = require('../errors/errorHandler')
const controller = require('../controllers/chatt-room')

router.post('/create-room', catchErr(controller.createRoom))

module.exports = router