import { Service, Inject } from 'typedi';
import winston from 'winston';
import { Sequelize } from 'sequelize-typescript';
import {
  randomIdGenerator,
  capitalize,
  generateSequelizeFilters
} from '../../../utils';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../../../decorators/eventDispatcher';
import { QuestionResponse } from '../../../models/questionResponse';
import { Survey } from '../../../models/survey';
import { SurveySection } from '../../../models/surveySection';
import { Question } from '../../../models/question';
import { SurveyQuestion } from '../../../models/intermediary/surveyQuestion';
import { CardCollection } from '../../../models/cardCollection';
import { SurveyResponse } from '../../../models/surveyResponse';
import { SurveySectionQuestion } from '../../../models/intermediary/surveySectionQuestion';
import * as requests from './requests';
import * as responses from './responses';
import { ExperimentQuestion } from '../../../models/intermediary/experimentQuestion';
import events from '../../../subscribers/events';

@Service()
export default class SurveyService {
  private sequelizeFilters: object;

  constructor(
    @Inject('Survey') private surveyModel: typeof Survey,
    @Inject('Question') private questionModel: typeof Question,
    @Inject('ExperimentQuestion')
    private experimentQuestionModel: typeof ExperimentQuestion,
    @Inject('SurveyQuestion')
    private surveyQuestionModel: typeof SurveyQuestion,
    @Inject('SurveySection')
    private surveySectionModel: typeof SurveySection,
    @Inject('SurveyResponse')
    private surveyResponseModel: typeof SurveyResponse,
    @Inject('SurveySectionQuestion')
    private surveySectionQuestionModel: typeof SurveySectionQuestion,
    @Inject('QuestionResponse')
    private questionResponseModel: typeof QuestionResponse,
    @Inject('CardCollection')
    private cardCollectionModel: typeof CardCollection,
    @Inject('logger') private logger: winston.Logger,
    @Inject('sequelize') private sqlConnection: Sequelize,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    this.sequelizeFilters = {
      experimentId: (experimentId: string): object => {
        return {
          where: { experimentId }
        };
      },
      surveyId: (surveyId: string): object => {
        return {
          where: { surveyId }
        };
      },
      participantId: (participantId: string): object => {
        return {
          include: [
            {
              model: this.surveyResponseModel,
              required: true,
              where: { participantId }
            }
          ]
        };
      }
    };
  }

  public async GetSurveys(
    filters?: requests.ISurveyFilters
  ): Promise<responses.ISurveys> {
    try {
      this.logger.silly('Fetching surveys');
      const sequelizeFilters = generateSequelizeFilters(
        this.sequelizeFilters,
        filters
      );
      const surveyRecords = await this.surveyModel
        .scope('public')
        .findAndCountAll(sequelizeFilters);
      return {
        surveys: surveyRecords.rows,
        totalCount: surveyRecords.count
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetSurvey(surveyId: string): Promise<responses.ISurvey> {
    try {
      this.logger.silly(`Fetching survey ${surveyId}`);
      const surveyRecord = await this.surveyModel.scope('public').findOne({
        include: [
          {
            model: SurveySection
          },
          {
            model: this.questionModel
          }
        ],
        where: {
          surveyId
        }
      });
      return { survey: surveyRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetLatestSurvey(
    experimentId: string
  ): Promise<responses.ISurvey> {
    try {
      this.logger.silly('Fetching latest survey');
      const surveyRecord = await this.surveyModel
        .scope('public')
        .findOne({
          where: { visibility: 'public', experimentId },
          order: [['startDate', 'DESC']]
        })
        .then((survey) => survey);
      if (!surveyRecord) {
        return { survey: null };
      }
      return { survey: surveyRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetSurveyCompletionStatus(
    participantId: string,
    surveyId: string
  ): Promise<boolean> {
    try {
      this.logger.silly('Fetching survey status');
      const responseRecordExists = await this.questionResponseModel
        .findOne({
          where: { participantId, surveyId }
        })
        .then((responseRecord) => !!responseRecord)
        .catch((e) => {
          this.logger.error(e);
          throw e;
        });
      return responseRecordExists;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetAnkiDataSubmissionStatus(
    participantId: string,
    surveyId: string
  ): Promise<boolean> {
    // Checks if user submitted their CardCollection for the week's survey.
    const cardCollectionExists = await this.cardCollectionModel.count({
      where: { participantId, surveyId }
    });
    return !!cardCollectionExists;
  }

  public async GetSurveySection(
    // could redo this to return a payload w prev and nextSectionId, which can then use to fetch questions
    sectionNumber: number // change to sectionId?
  ): Promise<{ surveySection: SurveySection | null }> {
    try {
      this.logger.silly('Fetching survey section');
      const surveySectionRecord = await this.surveySectionModel.findOne({
        where: { sectionNumber }
      });
      if (!surveySectionRecord) {
        return { surveySection: null };
      }
      return { surveySection: surveySectionRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async CreateSurveyResponse(
    experimentId: string,
    surveyId: string,
    participantId: string
  ): Promise<SurveyResponse> {
    try {
      return await this.surveyResponseModel.create({
        responseId: randomIdGenerator(),
        experimentId,
        surveyId,
        participantId
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private async FormatQuestionResponse(
    responseId: string,
    experimentId: string,
    surveyId: string,
    participantId: string,
    questionResponse: requests.IQuestionResponse
  ): Promise<object[]> {
    const questionDataType = await this.questionModel
      .findOne({
        where: { questionId: questionResponse[0] }
      })
      .then((questionRecord) => questionRecord.dataType);
    if (!questionDataType) {
      throw new Error(`${questionResponse[0]} does not exist`);
    }

    const questionResponses = [];

    if (questionDataType !== 'json' && Array.isArray(questionResponse[1])) {
      questionResponse[1].forEach((answer) => {
        const response = {
          responseId,
          questionId: questionResponse[0],
          experimentId,
          surveyId,
          participantId
        };
        const dataType = capitalize(questionDataType);
        response[`answer${dataType}`] = answer;
        questionResponses.push(response);
      });
    } else {
      const result = {
        responseId,
        questionId: questionResponse[0],
        experimentId,
        surveyId,
        participantId
      };
      const dataType = capitalize(questionDataType);
      result[`answer${dataType}`] = questionResponse[1];
      questionResponses.push(result);
    }
    return questionResponses;
  }

  /**
   * Submits an array of question responses.
   */
  public async SubmitSurveyResponse(
    experimentId: string,
    surveyId: string,
    participantId: string,
    discordId: string,
    dataPayload: requests.IQuestionResponse
  ): Promise<{ questionResponses: QuestionResponse[] }> {
    try {
      const result = await this.sqlConnection.transaction(
        async (transaction) => {
          this.logger.silly('Finding or creating survey responseId');
          const responseId = await this.surveyResponseModel
            .findOrCreate({
              where: { surveyId, participantId },
              defaults: {
                responseId: randomIdGenerator(),
                experimentId,
                surveyId,
                participantId
              },
              transaction
            })
            .then((response) => response[0].responseId);
          this.logger.silly('Processing question responses');
          const questionResponses = [];
          for (const question of Object.entries(dataPayload)) {
            const responses = await this.FormatQuestionResponse(
              responseId,
              experimentId,
              surveyId,
              participantId,
              question
            );
            questionResponses.push(...responses);
          }

          this.logger.silly('Posting question responses');
          const questionResponseRecords = await this.questionResponseModel.bulkCreate(
            questionResponses,
            { transaction }
          );

          const role = this.surveyIdToRole(surveyId);
          if (discordId && role) {
            this.eventDispatcher.dispatch(events.survey.completeSurvey, {
              discordId,
              role
            });
          }

          return { questionResponses: questionResponseRecords };
        }
      );
      return result;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private surveyIdToRole(surveyId: string): string {
    switch (surveyId) {
      case 'ub06buuubypun14w05c5m9':
        return 'Acquisition Apprentice';
      case '8gcov3qmvtbuqwd1a1ph6':
        return 'SRSergeant';
      case 'fmqisvqe9z64dndlk6xkpg':
        return 'Immmersionaut';
      case 'd9u5dvc74s5arz0hqe634a':
        return 'SRStatistician';
      default:
        return '';
    }
  }

  public async PostAnkiCardCollection(
    experimentId: string,
    surveyId: string,
    participantId: string,
    responseId: string,
    cards: {}
  ): Promise<CardCollection> {
    this.logger.silly('Posting Anki card collection');
    const cardCollection = await this.cardCollectionModel.create({
      experimentId,
      surveyId,
      participantId,
      responseId,
      cards
    });
    return cardCollection;
  }
  public async CreateSurvey(
    surveyObj: requests.ICreateSurvey
  ): Promise<responses.ISurveyMetadata> {
    try {
      const result = await this.sqlConnection.transaction(
        async (transaction) => {
          this.logger.silly('Creating survey');
          const {
            experimentId,
            surveyId,
            title,
            description,
            startDate,
            endDate,
            surveyCategory,
            visibility
          } = surveyObj;
          const surveyRecord = await this.surveyModel.create(
            {
              surveyId,
              experimentId,
              title,
              description,
              startDate,
              endDate,
              surveyCategory,
              visibility
            },
            { transaction }
          );
          /**
           * Iterate over survey sections to create them and the corresponding SurveySectionQuestions'
           */
          const surveySectionQuestions = [];
          for (const section of surveyObj.sections) {
            section['surveyId'] = surveyId; // SurveySection model requires surveyId foreign key
            await this.surveySectionModel.create(section, { transaction });
            const surveyQuestions = [];
            for (const [idx, questionId] of section.questions.entries()) {
              /**
               * TODO: Would be WAY more efficient to query the whole experiment schema, and check if questions exist in memory.
               * Where should I put that method... import ExperimentService? or just do it in this service?
               */
              const questionExists = await this.experimentQuestionModel
                .findOne({
                  where: { questionId, experimentId }
                })
                .then((questionRecord) => !!questionRecord);
              if (!questionExists) {
                throw new Error(
                  `${questionId} doesn't exist in the experiment schema`
                );
              }
              /**
               * Associate questions with this surveyId.
               * Used to filter surveys that adminstered specific questions
               */
              surveyQuestions.push({
                questionId,
                surveyId
              });
              /**
               * Associate questions with this section.
               * Used for pagination when participants fill out surveys (e.x fetch questions from sectionId=asdf)
               */
              surveySectionQuestions.push({
                sectionId: section.sectionId,
                questionId: questionId,
                questionOrder: idx + 1
              });
            }
            /**
             * Associate questions with this survey
             */
            await this.surveyQuestionModel.bulkCreate(surveyQuestions, {
              transaction
            });
          }
          /**
           * Associate questions with their survey section
           */
          await this.surveySectionQuestionModel.bulkCreate(
            surveySectionQuestions,
            { transaction }
          );
          return { survey: surveyRecord };
        }
      );
      return result;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
