"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "questionResponses",
      [
        {
          responseId: "testQuestionOneResponse",
          questionId: "testQuestionOne",
          experimentId: "abc123",
          surveyId: "testSurvey",
          participantId: "abcd1234",
          answerSmallInt: null,
          answerInt: null,
          answerFloat: null,
          answerBoolean: null,
          answerVarchar: "My answer",
          answerText: null,
          answerJSON: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          responseId: "testQuestionTwoResponse",
          questionId: "testQuestionTwo",
          experimentId: "abc123",
          surveyId: "testSurvey",
          participantId: "abcd1234",
          answerSmallInt: null,
          answerInt: null,
          answerFloat: null,
          answerBoolean: null,
          answerVarchar: "item1",
          answerText: null,
          answerJSON: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("questionResponses", null, {});
  }
};
