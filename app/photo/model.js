const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Photos = sequelize.define(
  'Photos',
  {
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Photos;
