const verifyToken = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearertoken = bearer[1]
        req.token = bearertoken
        next()
    } else {
        res.json({
            message: "this is forbidden"
        })
    }
}

module.exports = verifyToken