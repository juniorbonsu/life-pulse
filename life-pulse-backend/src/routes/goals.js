const express = require('express')
const goals = require('../controllers/goalsController')
const router = express.Router()
const protect = require('../middleware/protect')

router.post("/", protect, goals.addGoal)
router.get("/", protect, goals.getGoals)
router.put("/:id", protect, goals.updateGoal)
router.delete("/:id", protect, goals.deleteGoal)

module.exports = router

