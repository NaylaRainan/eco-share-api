const express = require('express')
const cors = require('cors')

const app = express()

const authRoutes =
require('./routes/authRoutes')

const authMiddleware =
require('./middlewares/authMiddleware')

const ownerOnly =
require('./middlewares/roleMiddleware')

const itemRoutes =
require('./routes/itemRoutes')

const rentalRoutes =
require('./routes/rentalRoutes')

const errorHandler =
require('./middlewares/errorHandler')

const historyRoutes =
require('./routes/historyRoutes')

const profileRoutes =
require('./routes/profileRoutes')

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())

app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api/items', itemRoutes)

app.use('/api/rentals', rentalRoutes)

app.use('/api/history', historyRoutes)

app.use('/api/profile', profileRoutes)

app.use(errorHandler)

app.get(
  '/protected',
  authMiddleware,
  (req, res) => {

    res.json({
      message: 'Protected route success',
      user: req.user
    })

  }
)

app.post(
  '/owner-test',
  authMiddleware,
  ownerOnly('owner'),
  (req, res) => {

    res.json({
      message: 'Owner access granted'
    })

  }
)

app.use(errorHandler)

module.exports = app