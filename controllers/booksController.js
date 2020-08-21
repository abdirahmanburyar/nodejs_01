const Users = require('../models/User')

exports.searchBook = async (req, res, next) => {
    const { q } = req.query
    return res.status(200).json({ query: req.query.q })
}
