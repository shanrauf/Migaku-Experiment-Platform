"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Experiments",
      [
        {
          experimentId: "abc123",
          title: "Example Experiment 1",
          description: "Example experiment description 1",
          startDate: new Date(),
          endDate: new Date(Date.now() + 8.64e7 * 14),
          visibility: "public",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: "123abc",
          title: "Example Experiment 2",
          description: "Example experiment description 2",
          startDate: new Date(),
          endDate: null,
          visibility: "private",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Experiments", null, {});
  }
};
