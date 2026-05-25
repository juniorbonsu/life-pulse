const express = require('express')
const auth = require('../controllers/authController')
const router = express.Router()

router.post('/signup', auth.signup)

router.post('/login', auth.login)

// router.post('/checkin', protect, controller.function)

module.exports = router


