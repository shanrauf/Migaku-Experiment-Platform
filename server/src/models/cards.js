const Sequelize = require("sequelize");

export class Cards extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        userId: { type: DataTypes.STRING },
        experimentId: { type: DataTypes.STRING },
        surveyId: { type: DataTypes.STRING },
        dataQuestionId: { type: DataTypes.STRING },
        cards: { type: DataTypes.JSON }
      },
      { modelName: "cards", sequelize }
    );
  }
}
