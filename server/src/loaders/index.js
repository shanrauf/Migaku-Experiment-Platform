import expressLoader from "./express";
import mongooseLoader from "./mongoose";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();

  console.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  console.info("✌️ Express loaded");
};
