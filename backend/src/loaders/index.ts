import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import Logger from "./logger";
import dependencyInjectorLoader from "./dependencyInjector";
import { models } from "../models";

export default async ({ expressApp }) => {
  const sqlConnection = sequelizeLoader();
  Logger.info("✌️ DB loaded and connected!");
  await dependencyInjectorLoader({
    sqlConnection,
    models // could use sequelize.model() to get models, but this will be easier to test i guess...
  });
  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  console.info("✌️ Express loaded");
};
