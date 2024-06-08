const express = require('express')
const router = express.Router()
const shortLinkController = require('../controllers/shortLinkController')
const jwt =require('jsonwebtoken')
require('dotenv').config()

// For posting a link
router.post('/api/link',verifyToken,shortLinkController.addLink)
//For getting all links of a user
router.get('/api/link',verifyToken,shortLinkController.getAllLinks)
//For getting single link
router.get('/api/link/:id',verifyToken,shortLinkController.getSingleLink)
//For updating link
router.post('/api/link/:id',verifyToken,shortLinkController.updateLink)
//For deleting link
router.delete('/api/link/:id',verifyToken,shortLinkController.deleteLink)




function verifyToken(req,res,next){
const token = req.cookies.accessToken
if(token){
jwt.verify(token,process.env.JWT_SECRET_KEY,(err,payload)=>{
    if(err){
        return res.send({"message":"Invalid Token"})
    }
    else{
        req.user = payload
        next()
    }
})
}
else{
    return res.send({"message":"Not authenticated"})
}
}

module.exports = router;