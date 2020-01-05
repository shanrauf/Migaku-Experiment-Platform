'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Surveys',
      [
        {
          experimentId: 'abc123',
          surveyId: 'testSurvey',
          title: 'Example Survey 1',
          description: 'Example survey description 1',
          surveyCategory: 'regular',
          visibility: 'public',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'abc123',
          surveyId: 'testSurveyTwo',
          title: 'Example Survey 2',
          description: 'Example survey description 2',
          surveyCategory: 'regular',
          visibility: 'public',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Surveys', null, {});
  }
};
