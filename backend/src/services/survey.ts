import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { IUser, IUserInputDTO } from "../interfaces/IUser";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../decorators/eventDispatcher";
import config from "../config";
import { Container, Service, Inject } from "typedi";
import { PassportStatic } from "passport";
import winston from "winston";
import { randomIdGenerator } from "../utils";
import { Model, DataType } from "sequelize-typescript";

@Service()
export default class SurveyService {
  constructor(
    @Inject("ExperimentSurvey")
    private ExperimentSurvey: Models.ExperimentSurvey,
    @Inject("Survey") private Survey: Models.Survey,
    @Inject("Question") private Question: Models.Question,
    @Inject("QuestionResponse")
    private QuestionResponse: Models.QuestionResponse,
    @Inject("SurveySection") private SurveySection: Models.SurveySection,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}
  questionId;
  public async GetSurveys(
    experimentId?: string
  ): Promise<{
    surveys: Model[];
    totalCount: number;
  }> {
    let where = {};
    this.logger.silly("Fetching surveys");
    if (experimentId) {
      const surveyRecords = await this.ExperimentSurvey.findAndCountAll({
        where: { experimentId },
        // offset: 10, implement pagination with this later
        limit: 10
      });
      return {
        surveys: surveyRecords.rows,
        totalCount: surveyRecords.count
      };
    }
    const surveyRecords = await this.Survey.findAndCountAll({
      // offset: 10, implement pagination with this later
      limit: 10
    });
    return {
      surveys: surveyRecords.rows,
      totalCount: surveyRecords.count
    };
  }

  public async GetSurvey(surveyId: string): Promise<{ survey: Model | null }> {
    this.logger.silly(`Fetching survey ${surveyId}`);
    const surveyRecord = await this.Survey.findByPk(surveyId);
    if (!surveyRecord) {
      return { survey: null };
    }
    return { survey: surveyRecord };
  }
  public async GetLatestSurvey(
    experimentId: string
  ): Promise<{ survey: Model | null }> {
    this.logger.silly("Fetching latest survey");
    const surveyRecord = await this.ExperimentSurvey.findOne({
      where: { visibility: "public", experimentId },
      order: [["startDate", "DESC"]]
    });
    if (!surveyRecord) {
      return { survey: null };
    }
    return { survey: surveyRecord };
  }
  public async GetSurveySection(
    // could redoo this to return a payload w prev and nextSectionId, which can then use to fetch questions
    sectionNumber: number
  ): Promise<{ surveySection: Model | null }> {
    this.logger.silly("Fetching survey section");
    const surveySectionRecord = await this.SurveySection.findOne({
      where: { sectionNumber }
    });
    if (!surveySectionRecord) {
      return { surveySection: null };
    }
    return { surveySection: surveySectionRecord };
  }
  private GetQuestionDataType(questionId: string): any {
    this.logger.silly("Fetching survey section");
    const question: any = this.Question.findByPk(questionId);
    return question.dataType;
  }
  public async PostSurveyResponses(
    experimentId: string,
    surveyId: string,
    dataPayload: {}
  ): Promise<{ questionResponses: Model[] | null }> {
    let participantId = ""; // grab from auth jwt token i guess
    this.logger.silly("Posting survey responses");
    let questionResponses = [];
    for (let i of Object.entries(dataPayload)) {
      let questionResponse = {
        responseId: randomIdGenerator(),
        questionId: i[0],
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
      let dataType = this.GetQuestionDataType(i[0]);
      questionResponse[dataType] = i[1];
      console.log(questionResponse);
      questionResponses.push(questionResponse);
    }
    const questionResponseRecords = await this.QuestionResponse.bulkCreate(
      questionResponses
    );
    return { questionResponses: questionResponseRecords };
  }
  public async CreateSurvey(surveyObj: {
    surveyId: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    sections?: {
      sectionId: string;
      sectionNumber: number;
      title: string;
      description: string | null;
      questions: {
        questionId: string;
        key: string;
        questionType: string;
        dataType: string;
        label: string;
        rules: string;
        items: string | any[];
        required: boolean;
      }[];
    }[];
  }): Promise<{ survey: Model | null }> {
    this.logger.silly("Creating survey");
    const surveyRecord = await this.Survey.create({
      surveyId: surveyObj.surveyId,
      title: surveyObj.title,
      description: surveyObj.description
    });

    for (let section of surveyObj.sections) {
      await this.SurveySection.update(section, {
        where: { sectionId: section.sectionId }
      });
      for (let question of section.questions) {
        await this.Question.create(question);
      }
    }
    return { survey: surveyRecord };
  }
  public async UpdateSurvey(surveyObj: {
    surveyId: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    sections?: {
      sectionId: string;
      sectionNumber: number;
      title: string;
      description: string | null;
      questions: {
        questionId: string;
        key: string;
        questionType: string;
        dataType: string;
        label: string;
        rules: string;
        items: string | any[];
        required: boolean;
      }[];
    }[];
  }): Promise<{ survey: Model | null }> {
    this.logger.silly("Updating survey");
    const surveyRecord = await this.Survey.build({
      surveyId: surveyObj.surveyId,
      title: surveyObj.title,
      description: surveyObj.description
    });
    surveyRecord.save();

    for (let section of surveyObj.sections) {
      await this.SurveySection.update(section, {
        where: { sectionId: section.sectionId }
      });
      for (let question of section.questions) {
        await this.Question.update(question, {
          where: { questionId: question.questionId }
        });
      }
    }
    return { survey: surveyRecord };
  }
}

// need to add something that accounts for if answer type changes
