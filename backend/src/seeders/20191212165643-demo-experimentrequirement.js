'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ExperimentRequirements',
      [
        {
          experimentId: 'abc123',
          requirementId: 'testRequirementOne',
          title: 'completedRRTK',
          description: 'Completed RRTK',
          value: 'true',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'abc123',
          requirementId: 'testRequirementTwo',
          title: 'completedPRTK',
          description: 'Completed PRTK',
          value: 'true',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('experimentrequirements', null, {});
  }
};
