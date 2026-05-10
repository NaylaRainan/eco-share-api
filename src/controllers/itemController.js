const { Item } = require('../../models')

class ItemController {

  static async create(req, res) {

    try {

      const {
        name,
        description,
        stock,
        price_per_day
      } = req.body

      const item = await Item.create({
        name,
        description,
        stock,
        price_per_day,
        owner_id: req.user.id,
        status: 'available'
      })

      res.status(201).json({
        success: true,
        message: 'Item created successfully',
        data: result
      })

    } catch (error) {

      res.status(500).json({
        message: error.message
      })

    }

  }

  static async getAll(req, res) {

    try {

      const items = await Item.findAll()

      res.json({
        success: true,
        data: items
      })

    } catch (error) {

      res.status(500).json({
        message: error.message
      })

    }

  }

}

module.exports = ItemController