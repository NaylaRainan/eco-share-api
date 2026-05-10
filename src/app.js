const express = require('express')

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

app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/items', itemRoutes)

app.use('/rentals', rentalRoutes)

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