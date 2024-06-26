const express = require('express');
const verifyToken = require('../controllers/verifyToken');
const clickController = require('../controllers/clickController');
const userDetails = require('../controllers/userDetails');
const router = express.Router()

// router.get('/l/:link',userDetails,clickController.redirect)
router.get('/api/clicks/:link',verifyToken,clickController.clicks)

module.exports = router;