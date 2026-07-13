const RentalService = require('../services/rentalService')
const { Rental, Item, User } = require('../../models')

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
            success: false,
            message: error.message
        })
    }

  }

  static async getAll(req, res) {

      try {

          const rentals = await Rental.findAll({

              include: [

                  {
                      model: Item,
                      attributes: ['name']
                  },

                  {
                      model: User,
                      attributes: ['name']
                  }

              ]

          })

          res.json({

              success: true,

              data: rentals

          })

      } catch (error) {

          res.status(500).json({

              success: false,

              message: error.message

          })

      }

  }

}

module.exports = RentalController