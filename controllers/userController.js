const bcrypt = require('bcrypt')
require('dotenv').config()
const User = require('../models/user')
const sendOTP = require('../controllers/sendOTP')
const generateToken = require('./generateJWTToken')
const { verifyOTP } = require('./verifyOTP')
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

//For sending OTP
module.exports.sendOtp = async(req,res)=>{
    const result = await sendOTP(res,req.user.email)
}

//For sending OTP
module.exports.verifyOtp = async(req,res)=>{
    const result = await verifyOTP(req,res)
}

// For logout
module.exports.logout = (req, res) => {
    const user = { email: "blank", verified: false }
    generateToken(res, user, process.env.LOGOUT_COOKIE_DURATION)
    return res.send('Logout')
}
