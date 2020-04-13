import { SurveyResponse } from './../../../models/surveyResponse';
import { Participant } from './../../../models/participant';
import { Survey } from './../../../models/survey';
import { Service, Inject } from 'typedi';
import winston from 'winston';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../../../decorators/eventDispatcher';
import { Experiment } from '../../../models/experiment';
import { Sequelize } from 'sequelize-typescript';
import { QuestionResponse } from '../../../models/questionResponse';
import { Question } from '../../../models/question';
import { generateSequelizeFilters } from '../../../utils';
import * as requests from './requests';
import * as responses from './responses';

@Service()
export default class QuestionResponseService {
  sequelizeFilters: object;

  constructor(
    @Inject('Experiment') private experimentModel: typeof Experiment,
    @Inject('Survey') private surveyModel: typeof Survey,
    @Inject('Participant') private participantModel: typeof Participant,
    @Inject('SurveyResponse')
    private surveyResponseModel: typeof SurveyResponse,
    @Inject('QuestionResponse')
    private questionResponseModel: typeof QuestionResponse,
    @Inject('Question')
    private questionModel: typeof Question,
    @Inject('sequelize') private sqlConnection: Sequelize,
    @Inject('logger') private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    this.sequelizeFilters = {
      participantId: (participantId) => {
        return {
          where: { participantId }
        };
      },
      questionId: (questionId) => {
        return {
          where: { questionId }
        };
      },
      experimentId: (experimentId) => {
        return {
          where: { experimentId }
        };
      },
      surveyId: (surveyId) => {
        return {
          where: { surveyId }
        };
      },
      responseId: (responseId) => {
        return {
          where: { responseId }
        };
      }
    };
  }

  public async GetQuestionResponses(
    filters?: requests.QuestionResponseFilters
  ): Promise<responses.IQuestionResponses> {
    try {
      this.logger.silly('Fetching question responses');
      const sequelizeFilters = generateSequelizeFilters(
        this.sequelizeFilters,
        filters
      );
      const result = await this.questionResponseModel.findAndCountAll(
        sequelizeFilters
      );
      return {
        questionresponses: result.rows,
        totalCount: result.count
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
