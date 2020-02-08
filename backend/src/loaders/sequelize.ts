import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import models from "../models";
import sequelizeConfig from "../config/sequelize";
import logger from "./logger";

export default async (): Promise<Sequelize> => {
  const sequelizeOptions: SequelizeOptions = {
    host: sequelizeConfig[process.env.NODE_ENV].host,
    dialect: "mysql",
    port: sequelizeConfig[process.env.NODE_ENV].port,
    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000
    }
  };
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
    .then(() => logger.info("DB authenticated"))
    .catch(err => {
      logger.error("Unable to connect to the database:", err);
    });
  logger.info("✌️ DB loaded and connected!");

  return sequelize;
};
