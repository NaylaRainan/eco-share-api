const router = require('express').Router()

const RentalController =
require('../controllers/rentalController')

const authMiddleware =
require('../middlewares/authMiddleware')

router.get(
    '/',
    authMiddleware,
    RentalController.getAll
)

router.post(
    '/',
    authMiddleware,
    RentalController.create
)

module.exports = router