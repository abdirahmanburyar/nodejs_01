exports.catchErr = fn => {
    return (req, res, next) => {
        return fn(req, res, next)
            .catch(err => {
                if (typeof err === 'string') {
                    return res.status(400).json({ message: err})
                }else {
                    return next(err)
                }
        })
    }
}