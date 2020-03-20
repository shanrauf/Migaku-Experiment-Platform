import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import dependencyInjectorLoader from "./dependencyInjector";
import passportLoader from "./passport";
import discordLoader from "./discord";
import emailLoader from "./mailer";
//We have to import at least all the events once so they can be triggered
import './events';

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
