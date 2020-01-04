import { Service, Inject } from 'typedi';
import winston from 'winston';
import { Model } from 'sequelize-typescript';
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
    @Inject('Survey') private Survey: Survey,
    @Inject('logger') private logger: winston.Logger,
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
      const surveyRecords = await Survey.scope('public').findAndCountAll({
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
      const surveyRecord = await Survey.scope('public').findOne({
        include: [
          {
            model: SurveySection
          },
          {
            model: Question
          }
        ],
        where: {
          surveyId
        }
      });
      if (!surveyRecord) {
        return { survey: null };
      }
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
      const surveyRecord = await Survey.scope('public')
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

  public async GetSurveyStatus(
    // this method is horrendously large
    participantId: string,
    surveyId: string
  ): Promise<any> {
    try {
      this.logger.silly('Fetching survey status');
      const participantExists = await Participant.findOne({
        where: { participantId }
      })
        .then(participantRecord => !!participantRecord)
        .catch(e => {
          this.logger.error(e);
          return 0;
        });

      if (!participantExists) {
        return 0; // user doesnt exist
      }

      const responseRecordExists = await QuestionResponse.findOne({
        where: { participantId, surveyId }
      })
        .then(responseRecord => !!responseRecord)
        .catch(e => {
          this.logger.error(e);
          throw e;
        });
      if (!responseRecordExists) {
        return 2; // user hasn't filled out survey
      }

      // check if user submitted an attribute that lucas will submit recently; e.x audioTotalTime
      // this is not a good idea... not every survey will have this attribute
      const audioTotalTime: any = await QuestionResponse.findOne({
        where: { questionId: 'audioTotalTime', participantId }
      });

      // check if the time submitted for that attribute is before the date of the most recent survey

      const mostRecentSurveyCreatedAt = await Survey.scope('public')
        .findOne({
          where: { surveyId },
          order: [['createdAt', 'DESC']]
        })
        .then(survey => survey.createdAt);

      // not very readable code with +new
      const mostRecentAnkiSync = +new Date(audioTotalTime).getTime();

      const surveyCreatedAt = new Date(mostRecentSurveyCreatedAt);
      const surveyCreatedAtTimestamp = surveyCreatedAt.getTime();

      if (audioTotalTime && mostRecentAnkiSync < surveyCreatedAtTimestamp) {
        return 3; // allready synced
      }
      // get most recent survey created at timestamp into format Lucas wants: "2019,12,07"
      const d = surveyCreatedAt; // make it easier to read
      const surveyCutoff = `${d.getFullYear()},${`0${d.getMonth() + 1}`.slice(
        -2
      )},${d.getDate()}`;
      return surveyCutoff; // ready to sync data
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetSurveySection(
    // could redoo this to return a payload w prev and nextSectionId, which can then use to fetch questions
    sectionNumber: number
  ): Promise<{ surveySection: SurveySection | null }> {
    try {
      this.logger.silly('Fetching survey section');
      const surveySectionRecord = await SurveySection.findOne({
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
      return await SurveyResponse.create({
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
      participantId,
      answerSmallInt: null,
      answerInt: null,
      answerFloat: null,
      answerBoolean: null,
      answerVarchar: null,
      answerText: null,
      answerJSON: null
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
  ): Promise<{ questionResponses: QuestionResponse[] | null | any[] }> {
    try {
      // Checking if user has already submitted the survey
      const responseRecordExists = await QuestionResponse.findOne({
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
          let questionExists = await Question.findOne({
            where: { questionId: question[0] }
          }).then(questionRecord => !!questionRecord);
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
      const questionResponseRecords = await QuestionResponse.bulkCreate(
        questionResponses
      );
      return { questionResponses: questionResponseRecords };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async GetSurveyResponseId(
    surveyId: string,
    participantId: string
  ): Promise<string | null> {
    this.logger.silly('Getting survey response id');
    const responseId = SurveyResponse.findOne({
      where: { surveyId, participantId }
    }).then(response => response.responseId);
    if (!responseId) {
      return null;
    } else {
      return responseId;
    }
  }

  private async CreateQuestion(surveyId: string, question: [string, any]) {
    const { dataType } = inferDataTypeOf(question[1]);
    await Question.create({
      questionId: question[0],
      key: question[0],
      questionType: 'text', // this is prob bad
      dataType,
      label: question[0], // bad
      rules: null,
      items: null,
      required: true,
      note: null,
      question: question[0] // bad and repetitive XD
    });
    await SurveyQuestion.create({
      questionId: question[0],
      surveyId
    });
    return { dataType };
  }

  public async PostAnkiCardCollection(
    experimentId: string,
    surveyId: string,
    participantId: string,
    cards: {}
  ): Promise<CardCollection> {
    this.logger.silly('Posting Anki card collection');
    const cardCollection = await CardCollection.create({
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
      const surveyRecord = await Survey.create({
        surveyId,
        experimentId,
        title,
        description,
        startDate,
        endDate,
        surveyCategory,
        visibility
      });

      for (const section of surveyObj.sections) {
        await SurveySection.update(section, {
          where: { sectionId: section.sectionId }
        });
        for (const question of section.questions) {
          await Question.create(question);
          await SurveyQuestion.create({
            questionId: question.questionId,
            surveyId: surveyObj.surveyId
          });
        }
      }
      return { survey: surveyRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async UpdateSurvey(
    surveyObj: ISurvey
  ): Promise<{ survey: Survey | null }> {
    try {
      this.logger.silly('Updating survey');
      const surveyRecord = await Survey.build({
        surveyId: surveyObj.surveyId,
        title: surveyObj.title,
        description: surveyObj.description
      });
      surveyRecord.save();

      for (const section of surveyObj.sections) {
        await SurveySection.update(section, {
          where: { sectionId: section.sectionId }
        });
        for (const question of section.questions) {
          await Question.update(question, {
            where: { questionId: question.questionId }
          });
        }
      }
      return { survey: surveyRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
