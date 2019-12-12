import sequelizeLoader from "./loaders/sequelize";

sequelizeLoader().then(sequelize => {
  sequelize.sync({
    force: true
  });
});
