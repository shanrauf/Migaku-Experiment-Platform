import {
  EventDispatcher,
  EventDispatcherInterface
} from "../decorators/eventDispatcher";
import { Service, Inject } from "typedi";
import winston from "winston";
import { randomIdGenerator, answerAndRestNull, capitalize } from "../utils";
import { Model, DataType, Sequelize } from "sequelize-typescript";
import { Survey } from "../models/survey";
import { ExperimentSurvey } from "../models/intermediary/experimentSurvey";

@Service()
export default class SurveyService {
  constructor(
    @Inject("ExperimentSurvey")
    private ExperimentSurvey: Models.ExperimentSurveyModel,
    @Inject("Survey") private Survey: Models.SurveyModel,
    @Inject("SurveyQuestion")
    private SurveyQuestion: Models.SurveyQuestionModel,

    @Inject("Experiment") private Experiment: Models.ExperimentModel,
    @Inject("Question") private Question: Models.QuestionModel,
    @Inject("QuestionResponse")
    private QuestionResponse: Models.QuestionResponseModel,
    @Inject("sequelize") private sequelize: Sequelize,
    @Inject("SurveySection") private SurveySection: Models.SurveySectionModel,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}
  questionId;
  public async GetSurveys(
    experimentId?: string
  ): Promise<{
    surveys: any[];
    totalCount: number;
  }> {
    try {
      this.logger.silly("Fetching surveys");
      const surveyRecords = await this.Survey.findAndCountAll({
        include: [
          {
            model: this.Experiment,
            attributes: ["experimentId"],
            where: { experimentId, visibility: "public" }
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

  public async GetSurvey(surveyId: string): Promise<{ survey: any }> {
    try {
      this.logger.silly(`Fetching survey ${surveyId}`);
      const surveyRecord = await this.Survey.findAndCountAll({
        include: [
          {
            model: this.SurveySection
          },
          {
            model: this.Question
          }
        ],
        where: {
          surveyId
        }
      });
      console.log(surveyRecord);
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
  ): Promise<{ survey: Model | null }> {
    try {
      this.logger.silly("Fetching latest survey");
      const surveyRecord = await this.ExperimentSurvey.findOne({
        where: { visibility: "public", experimentId },
        order: [["startDate", "DESC"]]
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
  public async GetSurveySection(
    // could redoo this to return a payload w prev and nextSectionId, which can then use to fetch questions
    sectionNumber: number
  ): Promise<{ surveySection: Model | null }> {
    try {
      this.logger.silly("Fetching survey section");
      const surveySectionRecord = await this.SurveySection.findOne({
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
  ): Promise<{ questionResponses: Model[] | null }> {
    try {
      this.logger.silly("Posting survey responses");
      let questionResponses = [];
      let question: any;
      for (question of Object.entries(dataPayload)) {
        let questionResponse = {
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
        console.log(question);
        let dataType = capitalize(question[1].dataType);
        questionResponse["answer" + dataType] = question[1].value;
        questionResponses.push(questionResponse);
      }
      const questionResponseRecords = await this.QuestionResponse.bulkCreate(
        questionResponses
      );
      console.log(questionResponses);
      return { questionResponses: questionResponseRecords };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async CreateSurvey(
    experimentId,
    surveyObj: {
      surveyId: string;
      title: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      surveyCategory?: string;
      visibility?: string;
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
          items: string;
          required: boolean;
        }[];
      }[];
    }
  ): Promise<{ survey: Model | null }> {
    try {
      this.logger.silly("Creating survey");
      const surveyRecord = await this.Survey.create({
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
      await this.ExperimentSurvey.create({
        startDate,
        endDate,
        experimentId,
        surveyId,
        surveyCategory,
        visibility
      });

      for (let section of surveyObj.sections) {
        await this.SurveySection.update(section, {
          where: { sectionId: section.sectionId }
        });
        for (let question of section.questions) {
          await this.Question.create(question);
          await this.SurveyQuestion.create({
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
    try {
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
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}

// need to add something that accounts for if answer type changes
