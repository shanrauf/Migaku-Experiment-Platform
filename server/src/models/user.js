const Sequelize = require("sequelize");

export class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    const { INTEGER, STRING } = DataTypes;
    return super.init(
      {
        userId: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: STRING, primaryKey: true, allowNull: false },
        email: { type: STRING, validate: { isEmail: true } },
        password: STRING
      },
      { modelName: "user", sequelize }
    );
  }
}
