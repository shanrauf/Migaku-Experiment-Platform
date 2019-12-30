'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Participants',
      [
        {
          participantId: 'abcd1234',
          email: 'test@test.com',
          password: 'test123',
          name: 'Test This',
          discordUsername: 'testing1234',
          age: 19,
          sex: 'female',
          lastLogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          participantId: '1234abcd',
          email: 'test2@test.com',
          password: 'test321',
          name: 'Shan Test',
          discordUsername: 'shanrauftest',
          age: 19,
          sex: 'male',
          lastLogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Participants', null, {});
  }
};
