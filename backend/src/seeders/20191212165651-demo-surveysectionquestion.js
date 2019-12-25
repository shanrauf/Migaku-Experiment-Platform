'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'SurveySectionQuestions',
      [
        {
          sectionId: 'testSectionOne',
          questionId: 'testQuestionOne',
          questionOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sectionId: 'testSectionTwo',
          questionId: 'testQuestionTwo',
          questionOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('surveysectionquestions', null, {});
  }
};
