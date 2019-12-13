"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ExperimentSurveys",
      [
        {
          experimentId: "abc123",
          surveyId: "testSurvey",
          startDate: new Date(),
          endDate: new Date(Date.now() + 8.64e7 * 14),
          surveyCategory: "regular",
          visibility: "public",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: "123abc",
          surveyId: "testSurvey",
          startDate: new Date(),
          endDate: null,
          surveyCategory: "regular",
          visibility: "private",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ExperimentSurveys", null, {});
  }
};
