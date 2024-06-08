const express = require('express')
const router = express.Router()
const shortLinkController = require('../controllers/shortLinkController')
const verifyToken = require('../controllers/verifyToken')
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


module.exports = router;