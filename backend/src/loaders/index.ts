import expressLoader from './express';
import sequelizeLoader from './sequelize';
import dependencyInjectorLoader from './dependencyInjector';
import passportLoader from './passport';
import discordLoader from './discord';
// import emailLoader from './mailer';

/**
 * Events must be imported so that they can be triggered.
 */
import './events';

export default async ({ expressApp }: { expressApp }) => {
  const passport = await passportLoader();
  const sqlConnection = await sequelizeLoader();
  const discordClient = await discordLoader();
  // const emailClient = await emailLoader();

  await dependencyInjectorLoader({
    sqlConnection,
    discordClient,
    emailClient: undefined,
    passport
  });

  await expressLoader({ app: expressApp });
};
