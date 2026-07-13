const RentalService = require("../services/rentalService");

class RentalController {

  static async create(req, res) {
    try {

      const rental = await RentalService.createRental(
        req.body,
        req.user.id
      );

      res.status(201).json({
        success: true,
        message: "Rental created successfully",
        data: rental
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }

  static async getAll(req, res) {

    try {

      const rentals = await RentalService.getAllRentals(req.user);

      res.json({
        success: true,
        data: rentals
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }

  static async getById(req, res) {

    try {

      const rental = await RentalService.getRentalDetail(
        req.params.id
      );

      res.json({
        success: true,
        data: rental
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }

  static async updateStatus(req, res) {

    try {

      const rental =
        await RentalService.updateStatus(
          req.params.id,
          req.body.status
        );

      res.json({
        success: true,
        message: "Status updated",
        data: rental
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }

}

module.exports = RentalController;