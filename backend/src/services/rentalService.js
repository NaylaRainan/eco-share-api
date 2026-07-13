const {
  Rental,
  Item,
  RentalHistory,
  sequelize
} = require('../../models')

class RentalService {

  static async createRental(data, userId) {

    const transaction = await sequelize.transaction()

    try {

      const {
        item_id,
        qty,
        start_date,
        end_date
      } = data

      // cek item
      const item = await Item.findByPk(item_id)

      if (!item) {
        throw new Error('Item not found')
      }

      // cek stock
      if (item.stock < qty) {
        throw new Error('Stock not available')
      }

      // hitung total harga
      const total_price =
        item.price_per_day * qty

      // kurangi stock
      item.stock -= qty

      await item.save({ transaction })

      // create rental
      const rental = await Rental.create({
        renter_id: userId,
        item_id,
        qty,
        total_price,
        status: 'pending',
        start_date,
        end_date
      }, { transaction })

      // create history
      await RentalHistory.create({
        rental_id: rental.id,
        note: 'Rental created'
      }, { transaction })

      // commit
      await transaction.commit()

      return rental

    } catch (error) {

      // rollback
      await transaction.rollback()

      throw error

    }

  }

  static async getAllRentals(user) {

    if (user.role === "owner") {

      return await Rental.findAll({
        include: [
          {
            model: Item
          }
        ],
        order: [["id", "DESC"]]
      });

    }

    return await Rental.findAll({

      where: {
        renter_id: user.id
      },

      include: [
        {
          model: Item
        }
      ],

      order: [["id", "DESC"]]

    });

  }

  static async getRentalDetail(id) {

    const rental = await Rental.findByPk(id, {

      include: [
        {
          model: Item
        }
      ]

    });

    if (!rental) {
      throw new Error("Rental not found");
    }

    return rental;

  }

  static async updateStatus(id, status) {

    const rental = await Rental.findByPk(id);

    if (!rental) {
      throw new Error("Rental not found");
    }

    rental.status = status;

    await rental.save();

    return rental;

  }

}

module.exports = RentalService