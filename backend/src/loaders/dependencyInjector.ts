import { Container } from "typedi";
import { ModelCtor, Sequelize } from "sequelize-typescript";
import LoggerInstance from "./logger";

export default async ({
  sqlConnection,
  models
}: {
  sqlConnection: Sequelize;
  models: ModelCtor[];
}) => {
  try {
    models.forEach(Model => {
      Container.set(Model.options.name.singular, Model);
    });

    Container.set("sequelize", sqlConnection);
    // If I ever want to access it for whatever reason... const sequelize = Container.get<Sequelize>('sequelize')
    Container.set("logger", LoggerInstance);

    LoggerInstance.info("✌️ Logger injected into container");
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
