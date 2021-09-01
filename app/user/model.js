const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Photos = require('../photo/model');

const Users = sequelize.define(
  'Users',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    role: {
      type: DataTypes.ENUM(['admin', 'user']),
      defaultValue: 'user',
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Users;
