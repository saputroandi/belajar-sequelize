const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
};
