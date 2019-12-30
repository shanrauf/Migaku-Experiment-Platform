'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'SurveyResponses',
      [
        {
          responseId: 'testSurveyResponse1',
          experimentId: 'abc123',
          surveyId: 'testSurvey',
          participantId: 'abcd1234',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          responseId: 'testSurveyResponse2',
          experimentId: 'abc123',
          surveyId: 'testSurvey',
          participantId: '1234abcd',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SurveyResponses', null, {});
  }
};
