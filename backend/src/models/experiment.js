import { Model } from "sequelize";

export class Experiment extends Model {
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
      { modelName: "experiment", tableName: "experiment", sequelize }
    );
  }
}
