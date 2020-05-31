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
import { generateSequelizeFilters, capitalize } from '../../../utils';
import * as requests from './requests';
import * as responses from './responses';

// Bad; not dependecy injection
import { Op } from 'sequelize';

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
      participantId: (participantId: string) => {
        return {
          where: { participantId }
        };
      },
      questionId: (questionId: string) => {
        return {
          where: { questionId }
        };
      },
      experimentId: (experimentId: string) => {
        return {
          where: { experimentId }
        };
      },
      surveyId: (surveyId: string) => {
        return {
          where: { surveyId }
        };
      },
      responseId: (responseId: string) => {
        return {
          where: { responseId }
        };
      },
      group: (group: string) => {
        return {
          group: [group]
        };
      }
    };
  }

  /**
   * Returns all question responses for the questionId
   */
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

  /**
   * Returns the average response to a question for every survey
   */
  public async GetAverageQuestionResponses(
    filters?: requests.QuestionResponseFilters
  ): Promise<responses.IQuestionResponses> {
    try {
      this.logger.silly('Fetching question responses');
      const sequelizeFilters = generateSequelizeFilters(
        this.sequelizeFilters,
        filters
      );
      const question = await this.questionModel.findByPk(filters.questionId);
      const dataType = 'answer' + capitalize(question.dataType);
      const attributes: any = [
        dataType,
        this.sqlConnection.Sequelize.fn(
          'AVG',
          this.sqlConnection.Sequelize.col(dataType)
        )
      ];
      sequelizeFilters['group'] = ['surveyId'];
      const result = await this.questionResponseModel.findAndCountAll({
        ...sequelizeFilters,
        attributes
      });
      return {
        questionresponses: result.rows,
        totalCount: result.count
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   * Returns the occurences of every possible answer for the question.
   */
  public async GetQuestionDistribution(
    filters?: requests.QuestionResponseFilters
  ): Promise<responses.IQuestionResponses> {
    try {
      this.logger.silly('Fetching question distribution');
      const sequelizeFilters = generateSequelizeFilters(
        this.sequelizeFilters,
        filters
      );

      const question = await this.questionModel.findByPk(filters.questionId);
      const dataType = 'answer' + capitalize(question.dataType);

      const attributes: any = [
        dataType,
        this.sqlConnection.Sequelize.fn(
          'COUNT',
          this.sqlConnection.Sequelize.col(dataType)
        )
      ];
      sequelizeFilters['group'] = [dataType];
      const result = await this.questionResponseModel.findAndCountAll({
        ...sequelizeFilters,
        attributes
      });
      return {
        // questionresponses: result.rows,
        questionresponses: [],
        totalCount: result.count
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
