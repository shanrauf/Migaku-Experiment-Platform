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
const { QueryTypes } = require('sequelize');

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
        [
          this.sqlConnection.Sequelize.fn(
            'AVG',
            this.sqlConnection.Sequelize.col(dataType)
          ),
          dataType
        ]
      ];
      // sequelizeFilters['group'] = ['surveyId'];
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
  // public async GetQuestionDistribution(
  //   filters?: requests.QuestionResponseFilters
  // ): Promise<responses.IQuestionResponses> {
  //   try {
  //     this.logger.silly('Fetching question distribution');
  //     const acceptableExperiments = [
  //       'audiovssentencecards',
  //       'mia-community-census'
  //     ];
  //     if (!acceptableExperiments.includes(filters.experimentId)) {
  //       return {
  //         questionresponses: [],
  //         totalCount: 0
  //       };
  //     }
  //     const { experimentId } = filters;
  //     // const question = await this.questionModel.findByPk(filters.questionId);
  //     // if (question === null) {
  //     //   return {
  //     //     questionresponses: [],
  //     //     totalCount: 0
  //     //   };
  //     // }
  //     const { questionId } = filters;
  //     // could be numbers too like 1-5 questions, age, hours in a week questions, etc
  //     const dataType = 'answerVarchar';
  //     // const dataType = 'answer' + capitalize(question.dataType);
  //     this.logger.silly('Executing raw query');
  //     const queryStr = `SELECT ${dataType}, COUNT(*) as count FROM mia_experiment.QuestionResponses as questionresponses INNER JOIN mia_experiment.Participants as participants ON participants.participantId = questionresponses.participantId WHERE questionId= :questionId AND experimentId= :experimentId GROUP BY ${dataType}`;
  //     const result = await this.sqlConnection.query(queryStr, {
  //       replacements: { experimentId, questionId }
  //     });
  //     // return {
  //     //   questionresponses: result[0],
  //     //   totalCount: result[1]
  //     // } as any;
  //     this.logger.silly(queryStr);
  //     this.logger.silly(result);
  //     return result[0] as any;
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw e;
  //   }
  // }
}
