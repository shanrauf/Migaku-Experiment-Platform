import { Model } from "sequelize";

export class Participant extends Model {
  static init(sequelize, DataTypes) {
    const { SMALLINT, STRING } = DataTypes;
    return super.init(
      {
        email: { type: STRING, validate: { isEmail: true } },
        password: STRING,
        name: { type: STRING },
        discordUsername: { type: STRING },
        age: { type: SMALLINT },
        sex: { type: STRING }
      },
      { modelName: "participant", tableName: "participant", sequelize }
    );
  }
  associate(models) {
    this.belongsToMany(models.Experiment, {
      through: "ExperimentParticipants",
      as: "asdf",
      foreignKey: "participantId",
      otherKey: "experimentId"
    });
  }
}
