import { Model } from "sequelize";

export class QuestionSection extends Model {
  static init(sequelize, DataTypes) {
    const { SMALLINT, STRING } = DataTypes;
    return super.init(
      {
        sectionId: { type: STRING, validate: { isEmail: true } },
        title: STRING,
        description: { type: STRING }
      },
      { modelName: "questionSection", tableName: "questionSection", sequelize }
    );
  }
  // associate(models) {
  //   this.belongsToMany(models.Experiment, {
  //     through: "ExperimentParticipants",
  //     as: "asdf",
  //     foreignKey: "participantId",
  //     otherKey: "experimentId"
  //   });
  // }
}
