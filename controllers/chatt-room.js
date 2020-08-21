const Users = require('../models/User')

exports.createRoom = async (req, res, next) => {
    return res.status(200).json({ user: req.user })
}

