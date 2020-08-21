const { server, app } = require('./app')
const passport = require('passport')
const userRoutes = require('./routes/users')
const roomRoutes = require('./routes/rooms')
const booksRoute = require('./routes/books')
// user's route
app.use('/api/users', userRoutes)
app.use('/api/books', booksRoute)
app.use('/api/room', passport.authenticate('jwt', { session: false }), roomRoutes)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`server running on :) http://localhost:${PORT}`)
})