import { Sequelize } from "sequelize-typescript";
import { modelsArray } from "../models";
import sequelizeConfig from "../config/sequelize";

export default async () => {
  const sequelize = new Sequelize(
    sequelizeConfig[process.env.NODE_ENV].database,
    sequelizeConfig[process.env.NODE_ENV].username,
    process.env.ROOT_PASS,
    {
      host: process.env.DATABASE_URL,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );

  sequelize.addModels([...modelsArray]);

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
