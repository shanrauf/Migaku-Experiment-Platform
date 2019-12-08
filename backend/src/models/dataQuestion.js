import { Model } from "sequelize";

export class DataQuestion extends Model {
  static init(sequelize, DataTypes) {
    const { JSON, DATE, STRING } = DataTypes;
    return super.init(
      {
        sectionId: { type: STRING },
        questionType: STRING,
        answerType: { type: STRING },
        label: { type: STRING },
        rules: { type: DATE },
        items: { type: DATE },
        required: { type: JSON },
        note: { type: STRING },
        question: { type: STRING }
      },
      { modelName: "dataQuestion", tableName: "dataQuestion", sequelize }
    );
  }
}
