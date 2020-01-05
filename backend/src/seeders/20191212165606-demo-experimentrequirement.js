'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ExperimentRequirements',
      [
        {
          experimentId: 'audiovssentencecards',
          requirementId: 'completedRRTK',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          requirementId: 'maxKnownWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'abc123',
          requirementId: 'maxKnownWords',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ExperimentRequirements', null, {});
  }
};
