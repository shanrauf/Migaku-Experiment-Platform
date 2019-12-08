const Sequelize = require("sequelize");

export class Survey extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    const { JSON, DATE, STRING } = DataTypes;
    return super.init(
      {
        surveyId: { type: STRING },
        title: STRING,
        surveyCategory: { type: STRING },
        description: { type: STRING },
        startDate: { type: DATE },
        endDate: { type: DATE },
        sectionOrder: { type: JSON },
        visibility: { type: STRING }
      },
      { modelName: "survey", tableName: "surveys", sequelize }
    );
  }
}
