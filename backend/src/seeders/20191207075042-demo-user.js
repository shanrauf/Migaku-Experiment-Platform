"use strict";

module.exports = {
  up: (queryInterface, _) => {
    // not using second parameter of Sequelize
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          userId: 123456789,
          username: "asdf",
          email: "asdf@gmail.com",
          password: "asdf",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
