const router = require('express').Router()

const HistoryController =
require('../controllers/historyController')

const authMiddleware =
require('../middlewares/authMiddleware')

router.get(
    '/',
    authMiddleware,
    HistoryController.getAll
)

module.exports = router