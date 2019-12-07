import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  sequelize: {
    options: {
      host: process.env.DATABASE_URL,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
    development: {
      username: "root",
      password: process.env.ROOT_PASS,
      database: "mia_experiment",
      host: "127.0.0.1",
      dialect: "mysql",
      operatorsAliases: false
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql",
      operatorsAliases: false
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql",
      operatorsAliases: false
    }
  },
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },
  /**
   * API configs
   */
  api: {
    prefix: "/api"
  }
};
