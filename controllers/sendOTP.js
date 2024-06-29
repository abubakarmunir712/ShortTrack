const SMTPConnection = require('smtp-connection');
require('dotenv').config()
const OTPModel = require('../models/OTP')
const myemail = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;
const sendOTP = async (res, email) => {
  const connection = new SMTPConnection({
    port: 465,
    host: 'smtp.gmail.com',
    secure: true, // use SSL
  });
    
    connection.connect(() => {
      connection.login({
        user: myemail,
            pass: password,
          }, async (err) => {
            if (err) {
              console.error(err);
              
            }
            else{
              console.log("connected")
            }
            
            const OTP = Math.floor(100000 + Math.random() * 900000);
            const message = `From: ${myemail}\r\nTo: ${email}\r\nSubject: OTP\r\n\r\nYour OTP is ${OTP}`;
            
            const delOtp = await OTPModel.deleteMany({ email });
            const otp = await OTPModel.create({ email, OTP });
            console.log(otp);


            connection.send({
                from: myemail,
                to: [email],
            }, message, async (err, info) => {
                if (err) {
                    res.status(500).send({message:'Internal Server Error'})
                }
                else{
                    res.status(200).send({message:'OTP has been sent'})
                }
                connection.quit();
            });
        });
    });
};
module.exports = sendOTP;