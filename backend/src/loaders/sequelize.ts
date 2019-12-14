import { Sequelize } from "sequelize-typescript";
import models from "../models";
import sequelizeConfig from "../config/sequelize";

export default async () => {
  const sequelizeOptions: any = {
    host: sequelizeConfig[process.env.NODE_ENV].host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ],
      max: 5
    }
  };
  if (process.env.NODE_ENV == "production") {
    sequelizeOptions["port"] = sequelizeConfig[process.env.NODE_ENV].port; // crashes on dev...
  }
  const sequelize = new Sequelize(
    sequelizeConfig[process.env.NODE_ENV].database,
    sequelizeConfig[process.env.NODE_ENV].username,
    sequelizeConfig[process.env.NODE_ENV].password,
    sequelizeOptions
  );

  sequelize.addModels([...models]);

  if (process.env.FORCE_SYNC) {
    await sequelize.sync({
      force: true
    });
  }

  sequelize
    .authenticate()
    .then(() => {
      console.log("MySQL authenticated");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
  return sequelize;
};
