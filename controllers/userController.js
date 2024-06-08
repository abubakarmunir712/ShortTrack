const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const User = require('../models/user')
const { toInt } = require('validator')

// For Login
module.exports.login = async (req, res) => {

    const { email, password } = req.body
    if(email && password){

    
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

    return res.json({ message: "Email does not exist!" })}
    else{
        res.json({"message":"Please provide both email and password"})
    }
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