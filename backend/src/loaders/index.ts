import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import dependencyInjectorLoader from "./dependencyInjector";
import passportLoader from "./passport";
import discordLoader from "./discord";
import emailLoader from "./mailer";

export default async ({ expressApp }: { expressApp }) => {
  await passportLoader();
  const sqlConnection = await sequelizeLoader();
  const discordClient = await discordLoader();
  const emailClient = await emailLoader();

  await dependencyInjectorLoader({
    sqlConnection,
    discordClient,
    emailClient
  });

  await expressLoader({ app: expressApp });
};
