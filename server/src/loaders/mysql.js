const Sequelize = require("sequelize");
import models from "../models";
import config from "../config";

export default async () => {
  const sequelize = new Sequelize(
    "mia_experiment",
    "root",
    process.env.ROOT_PASS,
    config.sequelize
  );

  const db = {
    ...models(sequelize, Sequelize),
    sequelize
  };

  db.sequelize
    .authenticate()
    .then(() => {
      console.log("MySQL authenticated");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
  return db;
};
