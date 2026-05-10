'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RentalHistory.belongsTo(models.Rental, {
        foreignKey: 'rental_id'
      })
    }
  }
  RentalHistory.init({
    rental_id: DataTypes.INTEGER,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RentalHistory',
    timestamps: false
  });
  return RentalHistory;
};