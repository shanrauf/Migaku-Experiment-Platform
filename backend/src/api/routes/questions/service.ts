import { Service, Inject } from "typedi";
import winston from "winston";
import { generateSequelizeFilters } from "../../../utils";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../../../decorators/eventDispatcher";
import { Experiment } from "../../../models/experiment";
import { Question } from "../../../models/question";

import * as requests from "./requests";
import * as responses from "./responses";
import { Survey } from "../../../models/survey";
import { Sequelize } from "sequelize-typescript";

@Service()
export default class ExperimentService {
  private sequelizeFilters: object;

  constructor(
    @Inject("Experiment") private experimentModel: typeof Experiment,
    @Inject("Survey") private surveyModel: typeof Survey,
    @Inject("Question") private questionModel: typeof Question,
    @Inject("sequelize") private sqlConnection: Sequelize,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    this.sequelizeFilters = {
      experimentId: experimentId => {
        return {
          include: [
            {
              model: this.experimentModel,
              required: true,
              attributes: [],
              where: { experimentId },
              through: { attributes: [] }
            }
          ]
        };
      },
      surveyId: surveyId => {
        return {
          include: [
            {
              model: this.surveyModel,
              required: true,
              attributes: [],
              where: { surveyId },
              through: { attributes: [] }
            }
          ]
        };
      }
    };
  }

  public async GetQuestions(
    filters?: requests.IQuestionFilters
  ): Promise<responses.IQuestions> {
    this.logger.silly("Fetching questions");
    const queryFilters = await generateSequelizeFilters(
      this.sequelizeFilters,
      filters
    );
    const questionRecords = await this.questionModel.findAndCountAll(
      queryFilters
    );
    if (!questionRecords.rows) {
      return { questions: null, totalCount: 0 };
    }
    return {
      questions: questionRecords.rows,
      totalCount: questionRecords.count
    };
  }
}
