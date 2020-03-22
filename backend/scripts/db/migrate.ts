import sequelizeLoader from '../../src/loaders/sequelize';
/*
  This file is used to setup the dev environment.
  It was used once in production to setup the prod db, but will never be used again in production.
*/

export async function initializeDatabase() {
  try {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'DO NOT DO THIS... ALL production data will be COMPLETELY LOST!'
      );
    }
    const sqlConnection = await sequelizeLoader();
    await sqlConnection.sync({
      force: true
    });
    console.log('Successfully created tables');
    await sqlConnection.close();
    process.exit(0);
  } catch (err) {
    console.error('Failed to force sync the database. ' + err);
    process.exit(1);
  }
}

(async () => {
  await initializeDatabase();
})();
