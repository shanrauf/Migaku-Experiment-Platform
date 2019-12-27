import sequelizeLoader from './loaders/sequelize';
/*
  This file is used to setup the dev environment;
  It was used once in production to setup the prod db, but will never be used again
*/
sequelizeLoader()
  .then(sequelize => {
    sequelize.sync({
      force: true
    });
  })
  .catch(() => {
    throw new Error('Failed to force sync the database');
  });
