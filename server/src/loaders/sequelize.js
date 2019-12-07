const Sequelize = require("sequelize");
import models from "../models";
import config from "../config";
import sequelizeConfig from "../config/sequelize.js";

export default async () => {
  const sequelize = new Sequelize(
    sequelizeConfig[process.env.NODE_ENV].database,
    sequelizeConfig[process.env.NODE_ENV].username,
    process.env.ROOT_PASS,
    config.sequelize.options
  );

  const db = {
    ...models(sequelize, Sequelize),
    sequelize,
    Sequelize
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
