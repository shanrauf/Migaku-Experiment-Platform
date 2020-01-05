import { Service, Inject } from 'typedi';
import winston from 'winston';
import { Sequelize } from 'sequelize-typescript';
import { randomIdGenerator, capitalize, inferDataTypeOf } from '../utils';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../decorators/eventDispatcher';
import { Participant } from '../models/participant';
import { QuestionResponse } from '../models/questionResponse';
import { Survey } from '../models/survey';
import { SurveySection } from '../models/surveySection';
import { Question } from '../models/question';
import { SurveyQuestion } from '../models/intermediary/surveyQuestion';
import { Experiment } from '../models/experiment';
import { CardCollection } from '../models/cardCollection';
import { ISurvey } from '../interfaces/ISurvey';
import { SurveyResponse } from '../models/surveyResponse';

@Service()
export default class SurveyService {
  constructor(
    @Inject('Participant') private participantModel: typeof Participant,
    @Inject('Survey') private surveyModel: typeof Survey,
    @Inject('Question') private questionModel: typeof Question,
    @Inject('SurveyQuestion')
    private surveyQuestionModel: typeof SurveyQuestion,
    @Inject('SurveySection')
    private surveySectionModel: typeof SurveySection,
    @Inject('SurveyResponse')
    private surveyResponseModel: typeof SurveyResponse,
    @Inject('QuestionResponse')
    private questionResponseModel: typeof QuestionResponse,
    @Inject('CardCollection')
    private cardCollectionModel: typeof CardCollection,
    @Inject('logger') private logger: winston.Logger,
    @Inject('sequelize') private sqlConnection: Sequelize,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}
  public async GetSurveys(
    experimentId?: string
  ): Promise<{
    surveys: Survey[];
    totalCount: number;
  }> {
    try {
      this.logger.silly('Fetching surveys');
      const surveyRecords = await this.surveyModel
        .scope('public')
        .findAndCountAll({
          include: [
            {
              model: Experiment,
              attributes: ['experimentId'],
              where: { experimentId }
            }
          ],
          limit: 10
        });
      return {
        surveys: surveyRecords.rows,
        totalCount: surveyRecords.count
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetSurvey(surveyId: string): Promise<{ survey: Survey }> {
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
  ): Promise<{ survey: Survey | null }> {
    try {
      this.logger.silly('Fetching latest survey');
      const surveyRecord = await this.surveyModel
        .scope('public')
        .findOne({
          where: { visibility: 'public', experimentId },
          order: [['startDate', 'DESC']]
        })
        .then(survey => survey);
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
    // surveyStartDate: Date
  ): Promise<any> {
    try {
      this.logger.silly('Fetching survey status');
      const responseRecordExists = await this.questionResponseModel
        .findOne({
          where: { participantId, surveyId }
        })
        .then(responseRecord => !!responseRecord)
        .catch(e => {
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
    question: [string, { dataType: string; value: any }]
  ): Promise<object> {
    const questionResponse = {
      responseId,
      questionId: question[0], // question key
      experimentId,
      surveyId,
      participantId
    };
    const dataType = capitalize(question[1].dataType);
    questionResponse[`answer${dataType}`] = question[1].value;
    return questionResponse;
  }

  public async PostSurveyResponses(
    experimentId: string,
    surveyId: string,
    participantId: string,
    responseId: string,
    dataPayload: object
  ): Promise<{ questionResponses: QuestionResponse[] }> {
    try {
      // Checking if user has already submitted the survey
      const responseRecordExists = await this.questionResponseModel.findOne({
        where: { participantId, surveyId }
      });
      if (!!responseRecordExists) {
        return { questionResponses: [] }; // user has already filled out survey
      }

      this.logger.silly('Processing question responses');
      const questionResponses = [];
      let question: any;
      for (question of Object.entries(dataPayload)) {
        if (question[0] === 'cards' || question[0] === 'Cards') {
          this.PostAnkiCardCollection(
            experimentId,
            surveyId,
            participantId,
            question[1] // do we need to check if this hasn't been parsed already?
          );
        } else {
          // check if question exists; only applies to non-survey data cuz survey question rows r created on survey creation
          let questionExists = await this.questionModel
            .findOne({
              where: { questionId: question[0] }
            })
            .then(questionRecord => !!questionRecord);
          if (!questionExists) {
            await this.CreateQuestion(surveyId, question); // this shouldn't be here - during experiment/survey creation, questions r created/assigned. but for now for anki, it's here
          }

          const questionResponse = await this.FormatQuestionResponse(
            responseId,
            experimentId,
            surveyId,
            participantId,
            question
          );
          questionResponses.push(questionResponse);
        }
      }

      this.logger.silly('Posting question responses');
      const questionResponseRecords = await this.questionResponseModel.bulkCreate(
        questionResponses
      );
      return { questionResponses: questionResponseRecords };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOrCreateResponseId(
    experimentId: string,
    surveyId: string,
    participantId: string
  ): Promise<string> {
    try {
      this.logger.silly('Finding survey responseId');
      const surveyResponse = await this.surveyResponseModel.findOne({
        attributes: ['responseId'],
        where: { surveyId, participantId }
      });
      if (!surveyResponse) {
        return await this.CreateSurveyResponse(
          experimentId,
          surveyId,
          participantId
        ).then(response => response.responseId);
      }
      return surveyResponse.responseId;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private async CreateQuestion(surveyId: string, question: [string, any]) {
    try {
      const { dataType } = inferDataTypeOf(question[1]);
      await this.sqlConnection.transaction(async transaction => {
        await this.questionModel.create(
          {
            questionId: question[0],
            key: question[0],
            questionType: 'text', // this is bad
            dataType,
            label: question[0], // this is bad
            rules: null,
            items: null,
            required: true,
            note: null,
            question: question[0] // this is bad
          },
          { transaction }
        );
        await this.surveyQuestionModel.create(
          {
            questionId: question[0],
            surveyId
          },
          { transaction }
        );
      });
      return { dataType };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
  public async PostAnkiCardCollection(
    experimentId: string,
    surveyId: string,
    participantId: string,
    cards: {}
  ): Promise<CardCollection> {
    this.logger.silly('Posting Anki card collection');
    const cardCollection = await this.cardCollectionModel.create({
      experimentId,
      surveyId,
      participantId,
      cards
    });
    return cardCollection;
  }

  public async CreateSurvey(
    experimentId: string,
    surveyObj: ISurvey
  ): Promise<{ survey: Survey | null }> {
    try {
      const result = await this.sqlConnection.transaction(async transaction => {
        this.logger.silly('Creating survey');
        const {
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

        for (const section of surveyObj.sections) {
          await this.surveySectionModel.create(section, { transaction });
          for (const question of section.questions) {
            let questionExists = await this.questionModel
              .findOne({
                where: { questionId: question.questionId }
              })
              .then(questionRecord => !!questionRecord);
            if (!questionExists) {
              await this.questionModel.create(question, { transaction }); // in theory, frontend should ensure no duplicates, but this is good security; would trying to create question anyway and getting validation error be faster than 2 queries?
            }
            await this.surveyQuestionModel.create(
              {
                questionId: question.questionId,
                surveyId: surveyObj.surveyId
              },
              { transaction }
            );
          }
        }
        return { survey: surveyRecord };
      });
      return result;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
