const { ExtractJwt, Strategy } = require('passport-jwt')
const Users = require('../models/User')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use(new Strategy(opts, async ( payload, done ) => {
        const user = await Users.findById(payload.userId)
        if(!user) return done(null, false)
        return done(null, user)
    }))
}