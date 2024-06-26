const { toInt } = require('validator')
const jwt = require('jsonwebtoken')
// Generating jwt tokens
function generateToken(res, user, expiry) {

    expiry = toInt(expiry)

    const token = jwt.sign({ email: user.email, verified: user.verified, id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiry
    })
    //Returning cookies
    return res.cookie("accessToken", token, {
        maxAge: expiry * 1000,
        httpOnly: true
    })
}

module.exports = generateToken;