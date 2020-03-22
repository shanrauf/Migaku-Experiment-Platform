require('dotenv').config();
const mysql2 = require('mysql2');

module.exports = {
  development: {
    username: process.env.ROOT_USER,
    password: process.env.ROOT_PASS,
    database: process.env.DATABASE_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 3306
  },
  test: {
    // create a script to create the db this config will eventually use
    username: process.env.ROOT_USER,
    password: process.env.ROOT_PASS,
    database: process.env.DATABASE_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 3306
  },
  production: {
    username: process.env.ROOT_USER_PROD,
    password: process.env.ROOT_PASS_PROD,
    database: process.env.DATABASE_NAME_PROD,
    host: process.env.DATABASE_URL_PROD,
    dialect: process.env.DATABASE_DIALECT,
    dialectModule: mysql2,
    port: 3306
  }
};
