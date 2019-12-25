'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'SurveySections',
      [
        {
          sectionId: 'testSectionOne',
          sectionNumber: 1,
          title: 'Section One',
          description: 'Example survey section description 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sectionId: 'testSectionTwoo',
          sectionNumber: 2,
          title: 'Section Two',
          description: 'Example survey section description 2',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('surveysections', null, {});
  }
};
