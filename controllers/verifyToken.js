const jwt = require('jsonwebtoken')
function verifyToken(req, res, next) {
    const token = req.cookies.accessToken
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return res.send({ "message": "Invalid Token" })
            }
            else {
                req.user = payload
                next()
            }
        })
    }
    else {
        return res.send({ "message": "Not authenticated" })
    }
}

module.exports = verifyToken;