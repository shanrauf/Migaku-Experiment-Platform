import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import Logger from "./logger";
import dependencyInjectorLoader from "./dependencyInjector";
import { modelsObject } from "../models";

export default async ({ expressApp }) => {
  const sqlConnection = await sequelizeLoader();
  // await sequelizeLoader();
  // sqlConnection.sync({ force: true }).then(() => {
  //   console.log("Forced");
  //   let user = new modelsObject["Participant"]();
  //   console.log(user);
  // });
  Logger.info("✌️ DB loaded and connected!");

  dependencyInjectorLoader({
    models: modelsObject
  });
  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  console.info("✌️ Express loaded");
};
