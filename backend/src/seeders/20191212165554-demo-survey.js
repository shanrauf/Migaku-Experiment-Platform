"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "surveys",
      [
        {
          surveyId: "testSurvey",
          title: "Example Survey 1",
          description: "Example survey description 1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          surveyId: "testSurveyTwo",
          title: "Example Survey 2",
          description: "Example survey description 2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("surveys", null, {});
  }
};
