import expressLoader from "./express";
import mysqlLoader from "./mysql";

export default async ({ expressApp }) => {
  const sqlConnection = await mysqlLoader();
  sqlConnection.sequelize
    .sync()
    .then(() =>
      console.log("Synced models with db (Use migrations instead b4 prod")
    );

  console.info("✌️ MySQL loaded");

  await expressLoader({ app: expressApp });
  console.info("✌️ Express loaded");
};
