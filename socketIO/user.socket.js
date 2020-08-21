const { io } = require('../app')
const Users = require('../models/User')

io.on('message', (msg) => console.log(msg))