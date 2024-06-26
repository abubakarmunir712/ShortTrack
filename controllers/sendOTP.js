const nodemailer = require('nodemailer');
require('dotenv').config()
const OTPModel = require('../models/OTP') 
// Create a transporter
async function sendOTP(res,email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'gmail'
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const OTP = Math.floor(100000 + Math.random() * 900000);
    // Set up email data
    const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: email,
        subject: 'OTP', // Subject line
        html: `<p color="red">Your OTP is ${OTP}</p>` // html body
    };
    const delOtp = await OTPModel.deleteMany({email})
    const otp = await OTPModel.create({email,OTP});
    console.log(otp)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send({message:"Internal Server error"})
        }
    });
    return res.send({message:"OTP has been sent"});
}

module.exports = sendOTP;