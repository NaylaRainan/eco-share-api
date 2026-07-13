'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Item, {
        foreignKey: 'owner_id'
      })

      User.hasMany(models.Rental, {
        foreignKey: 'renter_id'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('owner', 'renter'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};