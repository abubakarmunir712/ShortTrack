const express = require('express')
const userConroller = require('../controllers/userController')
const router = express.Router()

router.post('/api/login',userConroller.login)

router.post('/api/register',userConroller.register)

router.get('/api/logout',userConroller.logout)


module.exports=router;