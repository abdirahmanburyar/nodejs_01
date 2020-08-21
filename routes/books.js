const router = require('express').Router()

const { catchErr } = require('../errors/errorHandler')
const controller = require('../controllers/booksController')

router.get('/search', catchErr(controller.searchBook))

module.exports = router