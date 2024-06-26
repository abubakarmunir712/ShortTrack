const express = require('express')
const userConroller = require('../controllers/userController')
const verifyToken = require('../controllers/verifyToken')
const rateLimiting = require('../controllers/rateLimiting')
const router = express.Router()

router.post('/api/login',userConroller.login)

router.post('/api/register',userConroller.register)

router.get('/api/logout',userConroller.logout)

router.get('/api/otp',verifyToken,rateLimiting.getLimit,userConroller.sendOtp)

router.post('/api/otp',verifyToken,rateLimiting.postLimit,userConroller.verifyOtp)



module.exports=router;