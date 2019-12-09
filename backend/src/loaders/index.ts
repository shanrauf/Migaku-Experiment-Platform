import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import Logger from "./logger";
import dependencyInjectorLoader from "./dependencyInjector";
import { modelsObject } from "../models";

export default async ({ expressApp }) => {
  // const sqlConnection = await sequelizeLoader();
  await sequelizeLoader();

  Logger.info("✌️ DB loaded and connected!");

  await dependencyInjectorLoader({
    models: modelsObject
  });
  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  console.info("✌️ Express loaded");
};
