"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "CardCollections",
      [
        {
          id: 1,
          experimentId: "123abc",
          participantId: "abcd1234",
          surveyId: "testSurvey1",
          cards: JSON.stringify(["asdf"]),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CardCollections", null, {});
  }
};
