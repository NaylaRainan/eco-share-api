const router = require("express").Router();

const RentalController =
require("../controllers/rentalController");

const authMiddleware =
require("../middlewares/authMiddleware");

const ownerOnly =
require("../middlewares/roleMiddleware");

// renter membuat rental
router.post(
    "/",
    authMiddleware,
    RentalController.create
);

// semua rental
router.get(
    "/",
    authMiddleware,
    RentalController.getAll
);

// detail rental
router.get(
    "/:id",
    authMiddleware,
    RentalController.getById
);

// owner update status
router.put(
  "/:id/status",
  authMiddleware,
  ownerOnly("owner"),
  RentalController.updateStatus
);

module.exports = router;