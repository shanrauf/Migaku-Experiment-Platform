const Sequelize = require("sequelize");

export class Experiment extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    const { DATE, STRING } = DataTypes;
    return super.init(
      {
        experimentId: { type: STRING },
        title: STRING,
        description: { type: STRING },
        startDate: { type: DATE },
        endDate: { type: DATE },
        visibility: { type: STRING }
      },
      { modelName: "experiment", sequelize }
    );
  }
}
