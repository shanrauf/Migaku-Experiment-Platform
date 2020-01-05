'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Requirements',
      [
        {
          requirementId: 'completedRRTK',
          dataType: 'boolean',
          title: 'Completed RRTK',
          description:
            'Completing RRTK, previously known as Lazy Kanji, will make sentence mining easier',
          image: 'https://www.dropbox.com/s/fcxavuijy65hfem/profile.jpg?dl=1',
          value: 'true',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requirementId: 'maxKnownWords',
          dataType: 'number',
          title: 'Less Than 5000 Known Words',
          description:
            'This experiment is not targeting language learners in later stages of MIA',
          image: 'https://www.dropbox.com/s/fcxavuijy65hfem/profile.jpg?dl=1',
          value: 'true',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Requirements', null, {});
  }
};
