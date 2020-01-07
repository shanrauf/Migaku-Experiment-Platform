'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * AllowNull(false) rules that I added
     * https://github.com/shanrauf/mia-experiment/commit/2157f96d914e7aaeecbc66aea7812457af26c841
     */
    await queryInterface.changeColumn('SurveySectionQuestions', 'sectionId', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('SurveySectionQuestions', 'questionId', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn(
      'SurveySectionQuestions',
      'questionOrder',
      {
        type: Sequelize.TINYINT,
        allowNull: false
      }
    );
    await queryInterface.changeColumn('Surveys', 'startDate', {
      type: Sequelize.DATE,
      allowNull: true
    });
    // https://github.com/shanrauf/mia-experiment/commit/a4414db6752b7f98e792e3044157e5d1f29c272b
    await queryInterface.changeColumn('SurveySections', 'sectionId', {
      type: Sequelize.STRING,
      allowNull: false
    });
    // https://github.com/shanrauf/mia-experiment/commit/4980809ee52a54c4f53c6226a73d718d6fb5f019
    // await queryInterface.changeColumn('CardCollections', 'experimentId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('CardCollections', 'surveyId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('CardCollections', 'participantId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('CardCollections', 'responseId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('CardCollections', 'cards', {
    //   type: Sequelize.JSON,
    //   allowNull: false
    // });
    await queryInterface.changeColumn('Experiments', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Experiments', 'startDate', {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface.changeColumn('Experiments', 'visibility', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn(
      'ExperimentParticipants',
      'experimentId',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
    await queryInterface.changeColumn(
      'ExperimentParticipants',
      'participantId',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
    await queryInterface.changeColumn(
      'ExperimentParticipants',
      'registerDate',
      {
        type: Sequelize.DATE,
        allowNull: false
      }
    );
    await queryInterface.changeColumn('SurveyQuestions', 'surveyId', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('SurveyQuestions', 'questionId', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Participants', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Participants', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Participants', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Participants', 'age', {
      type: Sequelize.TINYINT,
      allowNull: false
    });
    await queryInterface.changeColumn('Participants', 'sex', {
      type: Sequelize.STRING(20),
      allowNull: false
    });
    await queryInterface.changeColumn('Participants', 'lastLogin', {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface.changeColumn('Questions', 'key', {
      // who cares, will delete later
      type: Sequelize.STRING(100),
      allowNull: true
    });
    await queryInterface.changeColumn('Questions', 'questionType', {
      type: Sequelize.STRING(50),
      allowNull: false
    });
    await queryInterface.changeColumn('Questions', 'dataType', {
      type: Sequelize.STRING(50),
      allowNull: false
    });
    await queryInterface.changeColumn('Questions', 'required', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    });
    await queryInterface.changeColumn('Questions', 'question', {
      type: Sequelize.STRING(500),
      allowNull: false
    });
    // await queryInterface.changeColumn('QuestionResponses', 'questionId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('QuestionResponses', 'responseId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('QuestionResponses', 'experimentId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('QuestionResponses', 'surveyId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('QuestionResponses', 'participantId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('Surveys', 'experimentId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    await queryInterface.changeColumn('Surveys', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Surveys', 'startDate', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.changeColumn('Surveys', 'surveyCategory', {
      type: Sequelize.STRING(100),
      allowNull: false
    });
    await queryInterface.changeColumn('Surveys', 'visibility', {
      type: Sequelize.STRING(25),
      allowNull: false
    });
    // await queryInterface.changeColumn('SurveyResponses', 'experimentId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('SurveyResponses', 'surveyId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('SurveyResponses', 'participantId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    // await queryInterface.changeColumn('SurveySections', 'surveyId', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // });
    await queryInterface.changeColumn('SurveySections', 'sectionNumber', {
      type: Sequelize.TINYINT,
      allowNull: false
    });
    return await queryInterface.changeColumn('SurveySections', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.changeColumn('SurveySections', 'title', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
