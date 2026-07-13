const router = require('express').Router()

const ProfileController =
require('../controllers/profileController')

const authMiddleware =
require('../middlewares/authMiddleware')

router.get(
    '/',
    authMiddleware,
    ProfileController.getProfile
)

module.exports = router