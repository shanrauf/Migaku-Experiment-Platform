import { Participant } from "./participant.js";
import { Experiment } from "./experiment.js";
import { Survey } from "./survey.js";
import { SurveyAnswer } from "./surveyAnswer.js";
import { SurveyQuestion } from "./surveyQuestion.js";
import { DataQuestion } from "./dataQuestion.js";
import { DataAnswer } from "./dataAnswer.js";
import { Cards } from "./cards.js";

const models = (sequelize, Sequelize) => {
  let models = {
    Participant: Participant.init(sequelize, Sequelize),
    Experiment: Experiment.init(sequelize, Sequelize),
    Survey: Survey.init(sequelize, Sequelize),
    SurveyAnswer: SurveyAnswer.init(sequelize, Sequelize),
    SurveyQuestion: SurveyQuestion.init(sequelize, Sequelize),
    DataQuestion: DataQuestion.init(sequelize, Sequelize),
    DataAnswer: DataAnswer.init(sequelize, Sequelize),
    Cards: Cards.init(sequelize, Sequelize)
  };

  // Run `.associate` if it exists,
  // ie create relationships in the ORM
  Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));
};

export default models;
