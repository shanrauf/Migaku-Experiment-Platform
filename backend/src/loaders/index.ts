import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import Logger from "./logger";
import dependencyInjectorLoader from "./dependencyInjector";

export default async ({ expressApp }) => {
  const sqlConnection = await sequelizeLoader();

  Logger.info("✌️ DB loaded and connected!");

  await dependencyInjectorLoader({
    models: sqlConnection.sequelize.models
  });
  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  console.info("✌️ Express loaded");
};
