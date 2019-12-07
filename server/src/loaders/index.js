import expressLoader from "./express";
import sequelizeLoader from "./sequelize";

export default async ({ expressApp }) => {
  // const sqlConnection = await sequelizeLoader();
  await sequelizeLoader();

  console.info("✌️ MySQL loaded");

  await expressLoader({ app: expressApp });
  console.info("✌️ Express loaded");
};
