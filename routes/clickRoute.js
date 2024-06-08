const express = require('express');
const verifyToken = require('../controllers/verifyToken');
const clickController = require('../controllers/clickController')
const router = express.Router()

router.get('/l/:link')
router.get('/api/clicks/:link',verifyToken,clickController.clicks)

module.exports = router;