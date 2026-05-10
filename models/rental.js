'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Rental.belongsTo(models.User, {
        foreignKey: 'renter_id'
      })

      Rental.belongsTo(models.Item, {
        foreignKey: 'item_id'
      })

      Rental.hasMany(models.RentalHistory, {
        foreignKey: 'rental_id'
      })
    }
  }
  Rental.init({
    renter_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rental',
    timestamps: false
  });
  return Rental;
};