"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "questions",
      [
        {
          questionId: "testQuestionOne",
          key: "questionOne",
          questionType: "text",
          dataType: "varchar",
          label: "Question One",
          rules: null,
          items: null,
          required: true,
          note: "This is a test so....",
          question: "What is a test?",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          questionId: "testQuestionTwo",
          key: "questionTwo",
          questionType: "select",
          dataType: "varchar",
          label: "Select One",
          rules: null,
          items: "['item1','item2']",
          required: true,
          note: "This is another test so....",
          question: "What isn't a test?",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("questions", null, {});
  }
};
