const express = require('express')
const app = express()
const auth = require('./src/routes/auth')
const checkin = require('./src/routes/checkin')
const goals = require('./src/routes/goals')

app.use(express.json())
app.use('/api/auth', auth)
app.use('/api/checkin', checkin)
app.use('/api/goals', goals)

app.get('/', (req, res) => {
  res.json({ message: 'LifePulse API is alive' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})