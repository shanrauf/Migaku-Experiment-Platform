require('dotenv').config();

module.exports = {
  development: {
    username: process.env.ROOT_USER,
    password: process.env.ROOT_PASS,
    database: process.env.DATABASE_NAME,
    host: '127.0.0.1',
    dialect: 'mysql'
    // port: 3000 This crashes npx sequelize-cli db:seed:all
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3000
  },
  production: {
    username: process.env.ROOT_USER_PROD,
    password: process.env.ROOT_PASS_PROD,
    database: process.env.DATABASE_NAME_PROD,
    host: process.env.DATABASE_URL_PROD,
    dialect: process.env.DATABASE_DIALECT,
    port: 3306
  }
};
