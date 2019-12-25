'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'SurveyQuestions',
      [
        {
          surveyId: 'testSurvey',
          questionId: 'testQuestionOne',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          surveyId: 'testSurvey',
          questionId: 'testQuestionTwo',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('surveyquestions', null, {});
  }
};
