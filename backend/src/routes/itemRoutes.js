const router = require('express').Router()

const ItemController = require('../controllers/itemController')

const authMiddleware = require('../middlewares/authMiddleware')

const ownerOnly = require('../middlewares/roleMiddleware')

router.post(
  '/',
  authMiddleware,
  ownerOnly ('owner'),
  ItemController.createItem
)

router.get(
  '/',
  ItemController.getAll
)

router.get(
    "/:id",
    ItemController.getById
);

router.put(
  '/:id',
  authMiddleware,
  ownerOnly('owner'),
  ItemController.updateItem
)


router.delete(
  '/:id',
  authMiddleware,
  ownerOnly('owner'),
  ItemController.deleteItem
)

module.exports = router