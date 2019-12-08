import { Model } from "sequelize";

export class SurveyAnswer extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        userId: { type: DataTypes.STRING },
        experimentId: { type: DataTypes.STRING },
        surveyId: { type: DataTypes.STRING },
        questionId: { type: DataTypes.STRING },
        // sectionId: { type: DataTypes.STRING },
        answerSmallInt: { type: DataTypes.SMALLINT },
        answerInt: { type: DataTypes.INTEGER },
        answerFloat: { type: DataTypes.FLOAT },
        answerBoolean: { type: DataTypes.BOOLEAN },
        answerVarchar: { type: DataTypes.STRING },
        answerText: { type: DataTypes.TEXT }
      },
      { modelName: "surveyAnswer", tableName: "surveyAnswers", sequelize }
    );
  }
}
