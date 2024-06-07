const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const User = require('../models/user')

// For Login
module.exports.login = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
        //Comparing Passwords
        const result = await bcrypt.compare(password, user.password)
        if (result) {
            generateToken(res, user, process.env.COOKIE_DURATION)
            
            return res.send('Login')

        }
        return res.json({ message: "Password does not match!" })
    }

    return res.json({ message: "Email does not exist!" })
}

// For Register
module.exports.register = async (req, res) => {

    try {

        const user = await User.create(req.body)
        generateToken(res, user, process.env.COOKIE_DURATION)
        return res.send('register')
    }
    catch (err) {
        return res.send(err)
    }

}

// For logout
module.exports.logout = (req, res) => {
    const user = { email: "blank", verified: false }
    generateToken(res, user, process.env.LOGOUT_COOKIE_DURATION)
    return res.send('Logout')
}


// Generating jwt tokens
function generateToken(res, user, expiry) {
    const token = jwt.sign({ email: user.email, verified: user.verified }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiry
    })

    return res.cookie("accessToken", token, {
        maxAge: expiry * 1000,
        httpOnly: true
    })
}