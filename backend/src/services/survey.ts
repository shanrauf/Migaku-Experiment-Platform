import { Service, Inject } from 'typedi';
import winston from 'winston';
import { Model } from 'sequelize-typescript';
import { randomIdGenerator, capitalize, inferDataTypeOf } from '../utils';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../decorators/eventDispatcher';
import { Participant } from '../models/participant';
import { ExperimentSurvey } from '../models/intermediary/experimentSurvey';
import { QuestionResponse } from '../models/questionResponse';
import { Survey } from '../models/survey';
import { SurveySection } from '../models/surveySection';
import { Question } from '../models/question';
import { SurveyQuestion } from '../models/intermediary/surveyQuestion';
import { Experiment } from '../models/experiment';
import { CardCollection } from '../models/cardCollection';
import { ISurvey } from '../interfaces/ISurvey';

@Service()
export default class SurveyService {
  constructor(
    @Inject('logger') private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  questionId;

  public async GetSurveys(
    experimentId?: string
  ): Promise<{
    surveys: Survey[];
    totalCount: number;
  }> {
    try {
      this.logger.silly('Fetching surveys');
      const surveyRecords = await Survey.findAndCountAll({
        include: [
          {
            model: Experiment,
            attributes: ['experimentId'],
            where: { experimentId, visibility: 'public' }
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
      const surveyRecord = await Survey.findOne({
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
  ): Promise<{ survey: ExperimentSurvey | null }> {
    try {
      this.logger.silly('Fetching latest survey');
      const surveyRecord = await ExperimentSurvey.findOne({
        where: { visibility: 'public', experimentId },
        order: [['startDate', 'DESC']]
      }).then(survey => survey);
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
      const audioTotalTime: any = await QuestionResponse.findOne({
        where: { questionId: 'audioTotalTime', participantId }
      });

      // check if the time submitted foro that attribute is before the date of the most recent survey

      const mostRecentSurveyCreatedAt = await Survey.findOne({
        where: { surveyId },
        order: [['createdAt', 'DESC']]
      }).then(survey => survey.createdAt);

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

  public async PostSurveyResponses(
    experimentId: string,
    surveyId: string,
    participantId: string,
    dataPayload: {}
  ): Promise<{ questionResponses: QuestionResponse[] | null | any[] }> {
    try {
      // Checking if user has already submitted the survey
      const responseRecordExists = await QuestionResponse.findOne({
        where: { participantId, surveyId }
      })
        .then(responseRecord => !!responseRecord)
        .catch(e => {
          this.logger.error(e);
          throw e;
        });
      if (responseRecordExists) {
        return { questionResponses: [] }; // user hasn't filled out survey
      }

      this.logger.silly('Posting survey responses');
      const questionResponses = [];
      let question: any;
      for (question of Object.entries(dataPayload)) {
        const questionResponse = {
          responseId: randomIdGenerator(),
          questionId: question[0],
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
        questionResponses.push(questionResponse);
      }
      const questionResponseRecords = await QuestionResponse.bulkCreate(
        questionResponses
      );
      return { questionResponses: questionResponseRecords };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async PostAnkiData(
    // being hacky and dangerous; checking if question exists, and if doesn,t creating it b4 inserting a QuestionResponse
    experimentId: string,
    surveyId: string,
    participantId: string,
    dataPayload: {}
  ): Promise<{ questionResponses: QuestionResponse[] | null }> {
    try {
      this.logger.silly('Posting survey responses');
      const questionResponses = [];
      let question: [string, any];
      for (question of Object.entries(dataPayload)) {
        if (question[0] === 'cards') {
          this.PostAnkiCardCollection(
            experimentId,
            surveyId,
            participantId,
            JSON.parse(question[1])
          );
        } else {
          // need to get dataType and questionId given question key after questioons created once

          // only runs once then throws validation error...
          const { dataType } = await this.CreateQuestion(surveyId, question);

          const questionResponse = {
            responseId: randomIdGenerator(),
            questionId: question[0],
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
          questionResponse[`answer${dataType}`] = question[1].value;
          questionResponses.push(questionResponse);
        }
      }
      const questionResponseRecords = await QuestionResponse.bulkCreate(
        questionResponses
      );
      return { questionResponses: questionResponseRecords };
    } catch (e) {
      this.logger.error(e);
      throw e;
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
  ): Promise<{ cardCollection: any }> {
    // this method seems overly complicated, but I don't have a test suite yet to change it
    const cardCollection = await CardCollection.create({
      experimentId,
      surveyId,
      participantId,
      cards
    }).then(c => ({ cards: c }));
    return { cardCollection };
  }

  public async CreateSurvey(
    experimentId: string,
    surveyObj: ISurvey
  ): Promise<{ survey: Survey | null }> {
    try {
      this.logger.silly('Creating survey');
      const surveyRecord = await Survey.create({
        surveyId: surveyObj.surveyId,
        title: surveyObj.title,
        description: surveyObj.description
      });

      const {
        surveyId,
        startDate,
        endDate,
        surveyCategory,
        visibility
      } = surveyObj;
      await ExperimentSurvey.create({
        startDate,
        endDate,
        experimentId,
        surveyId,
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

// need to add something that accounts for if answer type changes
