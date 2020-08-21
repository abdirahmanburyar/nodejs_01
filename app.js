const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const http = require('http')
const socketIO = require('socket.io')
const app = express()
require('./config/db')(mongoose)
const Users = require('./models/User')
require('./config/passport')(passport)
app.use(passport.initialize())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', (socket) => {
    
    console.log(`new user :) ${socket.id}`)
    console.log(socket)
    socket.on('disconnect', () => {
        console.log('disconneted user' + socket.id)
    })
})

module.exports = {
    server,
    app,
    io
}