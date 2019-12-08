import { Model } from "sequelize";

export class SurveyQuestion extends Model {
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
      { modelName: "surveyQuestion", tableName: "surveyQuestions", sequelize }
    );
  }
}
