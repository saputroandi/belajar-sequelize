const { Sequelize } = require('sequelize');
const { dbName } = require('../app/config');

const sequelize = new Sequelize(`mysql://root:@localhost:3306/${dbName}`, {
  logging: false,
});

module.exports = sequelize;
