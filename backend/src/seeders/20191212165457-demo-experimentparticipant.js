"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ExperimentParticipants",
      [
        {
          experimentId: "abc123",
          participantId: "abcd1234",
          registerDate: new Date(Date.now() - 8.64e7 * 14),
          dropoutDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: "abc123",
          participantId: "abcd1234",
          registerDate: new Date(Date.now() - 8.64e7 * 14),
          dropoutDate: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: "123abc",
          participantId: "1234abcd",
          registerDate: new Date(Date.now() - 8.64e7 * 7),
          dropoutDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: "123abc",
          participantId: "1234abcd",
          registerDate: new Date(Date.now() - 8.64e7 * 7),
          dropoutDate: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ExperimentParticipants", null, {});
  }
};
