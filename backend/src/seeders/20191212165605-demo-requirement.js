"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "requirements",
      [
        {
          requirementId: "testRequirementOne",
          key: "completedRRTK",
          dataType: "boolean",
          image: "https://www.dropbox.com/s/fcxavuijy65hfem/profile.jpg?dl=1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requirementId: "testRequirementTwo",
          key: "completedPRTK",
          dataType: "boolean",
          image: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("requirements", null, {});
  }
};
