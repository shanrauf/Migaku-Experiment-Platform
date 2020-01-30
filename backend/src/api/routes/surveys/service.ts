import { Service, Inject } from "typedi";
import winston from "winston";
import { Sequelize } from "sequelize-typescript";
import {
  randomIdGenerator,
  capitalize,
  generateSequelizeFilters
} from "../../../utils";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../../../decorators/eventDispatcher";
import { Participant } from "../../../models/participant";
import { QuestionResponse } from "../../../models/questionResponse";
import { Survey } from "../../../models/survey";
import { SurveySection } from "../../../models/surveySection";
import { Question } from "../../../models/question";
import { SurveyQuestion } from "../../../models/intermediary/surveyQuestion";
import { Experiment } from "../../../models/experiment";
import { CardCollection } from "../../../models/cardCollection";
import { SurveyResponse } from "../../../models/surveyResponse";
import { SurveySectionQuestion } from "../../../models/intermediary/surveySectionQuestion";
import * as requests from "./requests";
import * as responses from "./responses";

@Service()
export default class SurveyService {
  private sequelizeFilters: object;

  constructor(
    @Inject("Participant") private participantModel: typeof Participant,
    @Inject("Survey") private surveyModel: typeof Survey,
    @Inject("Question") private questionModel: typeof Question,
    @Inject("SurveyQuestion")
    private surveyQuestionModel: typeof SurveyQuestion,
    @Inject("SurveySection")
    private surveySectionModel: typeof SurveySection,
    @Inject("SurveyResponse")
    private surveyResponseModel: typeof SurveyResponse,
    @Inject("SurveySectionQuestion")
    private surveySectionQuestionModel: typeof SurveySectionQuestion,
    @Inject("QuestionResponse")
    private questionResponseModel: typeof QuestionResponse,
    @Inject("CardCollection")
    private cardCollectionModel: typeof CardCollection,
    @Inject("logger") private logger: winston.Logger,
    @Inject("sequelize") private sqlConnection: Sequelize,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    this.sequelizeFilters = {
      experimentId: experimentId => {
        return {
          where: { experimentId }
        };
      },
      surveyId: surveyId => {
        return {
          where: { surveyId }
        };
      },
      participantId: participantId => {
        return {
          include: [
            {
              model: this.surveyResponseModel,
              required: true,
              where: { participantId },
              attributes: []
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
      this.logger.silly("Fetching surveys");
      const sequelizeFilters = await generateSequelizeFilters(
        this.sequelizeFilters,
        filters
      );

      const surveyRecords = await this.surveyModel
        .scope("public")
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
      const surveyRecord = await this.surveyModel.scope("public").findOne({
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
      this.logger.silly("Fetching latest survey");
      const surveyRecord = await this.surveyModel
        .scope("public")
        .findOne({
          where: { visibility: "public", experimentId },
          order: [["startDate", "DESC"]]
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
  ): Promise<boolean> {
    try {
      this.logger.silly("Fetching survey status");
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
      this.logger.silly("Fetching survey section");
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
    question: [string, any],
    responseDataType: string
  ): Promise<object> {
    const questionResponse = {
      responseId,
      questionId: question[0],
      experimentId,
      surveyId,
      participantId
    };
    const dataType = capitalize(responseDataType);
    questionResponse[`answer${dataType}`] = question[1];
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
      // This won't prevent duplicate survey submission for now since Anki needs to POST here too...
      // need some way to identify if post coming from survey or anki idk...
      // const responseRecordExists = await this.questionResponseModel.findOne({
      //   where: { participantId, surveyId }
      // });
      // if (responseRecordExists) {
      //   return { questionResponses: null }; // user has already filled out survey
      // }

      this.logger.silly("Processing question responses");
      const questionResponses = [];
      let question: any;
      for (question of Object.entries(dataPayload)) {
        if (question[0] === "cards") {
          this.PostAnkiCardCollection(
            experimentId,
            surveyId,
            participantId,
            responseId,
            question[1]
          );
        } else {
          // get question dataType; Error means question doesn't exist
          const questionDataType = await this.questionModel
            .findOne({
              where: { questionId: question[0] }
            })
            .then(questionRecord => questionRecord.dataType);
          if (!questionDataType) {
            throw new Error(`${question[0]} does not exist`);
          }

          const questionResponse = await this.FormatQuestionResponse(
            responseId,
            experimentId,
            surveyId,
            participantId,
            question,
            questionDataType
          );
          questionResponses.push(questionResponse);
        }
      }

      this.logger.silly("Posting question responses");
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
      this.logger.silly("Finding or creating survey responseId");
      const surveyResponse = await this.surveyResponseModel.findOne({
        attributes: ["responseId"],
        where: { surveyId, participantId }
      });
      if (!surveyResponse) {
        return await this.CreateSurveyResponse(
          // bad in POST /:surveyId because not wrapped in transaction
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
  public async PostAnkiCardCollection(
    experimentId: string,
    surveyId: string,
    participantId: string,
    responseId: string,
    cards: {}
  ): Promise<CardCollection> {
    this.logger.silly("Posting Anki card collection");
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
    experimentId: string,
    surveyObj: requests.ISurvey
  ): Promise<{ survey: Survey | null }> {
    try {
      const result = await this.sqlConnection.transaction(async transaction => {
        this.logger.silly("Creating survey");
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
        let surveySectionQuestions = [];
        for (const section of surveyObj.sections) {
          section["surveyId"] = surveyId; // surveyObj sections don't hve surveyId in section rn...
          await this.surveySectionModel.create(section, { transaction });
          let surveyQuestions = [];
          for (const question of section.questions) {
            let questionExists = await this.questionModel
              .findOne({
                where: { questionId: question.questionId }
              })
              .then(questionRecord => !!questionRecord);
            if (!questionExists) {
              // TODO: Remove since we don't want questions that arent in experiment schema
              await this.questionModel.create(question, { transaction });
            }
            surveyQuestions.push({
              questionId: question.questionId,
              surveyId: surveyObj.surveyId
            });
            surveySectionQuestions.push({
              sectionId: section.sectionId,
              questionId: question.questionId,
              questionOrder: question.questionOrder
            });
          }
          await this.surveyQuestionModel.bulkCreate(surveyQuestions, {
            transaction
          });
        }
        await this.surveySectionQuestionModel.bulkCreate(
          surveySectionQuestions,
          { transaction }
        );
        return { survey: surveyRecord };
      });
      return result;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
