const RentalService = require('../services/rentalService')

class RentalController {

  static async create(req, res) {

    try {

      const rental =
        await RentalService.createRental(
          req.body,
          req.user.id
        )

      res.status(201).json({
        success: true,
        message: 'Rental created successfully',
        data: rental
      })

    } catch (error) {

      res.status(500).json({
        message: error.message
      })

    }

  }

}

module.exports = RentalController