const express = require('express')
const checkin = require('../controllers/checkinController')
const router = express.Router()
const protect = require('../middleware/protect')

router.post('/', protect, checkin)

module.exports = router