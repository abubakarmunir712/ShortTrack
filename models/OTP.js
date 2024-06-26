const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
    email: String,
    OTP: String
}, { timestamps: true })

const OTP = mongoose.model('OTP', OTPSchema)
module.exports = OTP;