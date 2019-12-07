const Sequelize = require("sequelize");

export class DataAnswer extends Sequelize.Model {
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
        answerVarchar: { type: DataTypes.VARCHAR },
        answerText: { type: DataTypes.TEXT },
        answerJSON: { type: DataTypes.JSON }
      },
      { modelName: "dataAnswer", sequelize }
    );
  }
}
