const otp = require('../models/OTP')
const user = require('../models/user')
const generateToken = require('./generateJWTToken')


module.exports.verifyOTP = async (req, res) => {
    const OTP = await otp.findOne({ email: req.user.email })
    if (!OTP) {
        return res.status(400).send({message:'Wrong OTP'})
    }
    else {
        if (OTP.OTP == req.body.OTP) {

            const User = await user.findOneAndUpdate({ email: req.user.email }, { verified: true },{new:true})
            const otp = await OTP.deleteOne({ email: req.user.email })
            generateToken(res,User,process.env.COOKIE_DURATION)
            return res.status(200).send({message:'Correct OTP'})
        }
        else {
            return res.status(400).send({message:'Wrong OTP'})

        }
    }
}