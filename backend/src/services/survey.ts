import {
  EventDispatcher,
  EventDispatcherInterface
} from "../decorators/eventDispatcher";
import { Service, Inject } from "typedi";
import winston from "winston";
import { randomIdGenerator, capitalize, inferDataTypeOf } from "../utils";
import { Model, Sequelize } from "sequelize-typescript";

@Service()
export default class SurveyService {
  constructor(
    @Inject("Participant")
    private Participant: Models.ParticipantModel,
    @Inject("ExperimentSurvey")
    private ExperimentSurvey: Models.ExperimentSurveyModel,
    @Inject("Survey") private Survey: Models.SurveyModel,
    @Inject("SurveyQuestion")
    private SurveyQuestion: Models.SurveyQuestionModel,
    @Inject("CardCollection")
    private CardCollection: Models.CardCollectionModel,
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
      }).then(survey => {
        return survey;
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
  public async GetSurveyStatus(
    participantId: string,
    surveyId: string
  ): Promise<any> {
    try {
      this.logger.silly("Fetching survey status");
      const participantExists = await this.Participant.findOne({
        where: { participantId }
      })
        .then((participantRecord: any) => {
          return !!participantRecord;
        })
        .catch(e => {
          this.logger.error(e);
          return 0;
        });

      if (!participantExists) {
        return 0; // user doesnt exist
      }

      const responseRecordExists = await this.QuestionResponse.findOne({
        where: { participantId, surveyId }
      })
        .then((responseRecord: any) => {
          return !!responseRecord;
        })
        .catch(e => {
          this.logger.error(e);
          throw e;
        });
      if (!responseRecordExists) {
        return 2; // user hasn't filled out survey
      }

      // check if user submitted an attribute that lucas will submit recently; e.x audioTotalTime
      const audioTotalTime: any = await this.QuestionResponse.findOne({
        where: { questionId: "audioTotalTime", participantId }
      });

      // check if the time submitted foro that attribute is before the date of the most recent survey

      const mostRecentSurveyCreatedAt = await this.Survey.findOne({
        where: { surveyId },
        order: [["createdAt", "DESC"]]
      }).then(survey => {
        return survey.createdAt;
      });

      let mostRecentAnkiSync = +new Date(audioTotalTime).getTime();

      let surveyCreatedAt = new Date(mostRecentSurveyCreatedAt);
      let surveyCreatedAtTimestamp = surveyCreatedAt.getTime();

      if (audioTotalTime && mostRecentAnkiSync < surveyCreatedAtTimestamp) {
        return 3; // allready synced
      } else {
        // get most recent survey created at timestamp intoo format Lucas wants: "2019,12,07"
        let d = surveyCreatedAt; // make it easier to read
        let surveyCutoff = `${d.getFullYear()},${(
          "0" +
          (d.getMonth() + 1)
        ).slice(-2)},${d.getDate()}`;
        return surveyCutoff; // ready to sync data
      }
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
  ): Promise<{ questionResponses: Model[] | null | any[] }> {
    try {
      // Checking if user has already submitted the survey
      const responseRecordExists = await this.QuestionResponse.findOne({
        where: { participantId, surveyId }
      })
        .then((responseRecord: any) => {
          return !!responseRecord;
        })
        .catch(e => {
          this.logger.error(e);
          throw e;
        });
      if (responseRecordExists) {
        return { questionResponses: [] }; // user hasn't filled out survey
      }

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
        let dataType = capitalize(question[1].dataType);
        questionResponse["answer" + dataType] = question[1].value;
        questionResponses.push(questionResponse);
      }
      const questionResponseRecords = await this.QuestionResponse.bulkCreate(
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
  ): Promise<{ questionResponses: Model[] | null }> {
    try {
      this.logger.silly("Posting survey responses");
      let questionResponses = [];
      let question: [string, any];
      for (question of Object.entries(dataPayload)) {
        if (question[0] == "cards") {
          this.PostAnkiCardCollection(
            experimentId,
            surveyId,
            participantId,
            JSON.parse(question[1])
          );
        } else {
          // need to get dataType and questionId given question key after questioons created once

          // only runs once then throws validation error...
          const dataType = (await this.CreateQuestion(surveyId, question))
            .dataType;

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
          questionResponse["answer" + dataType] = question[1].value;
          questionResponses.push(questionResponse);
        }
      }
      const questionResponseRecords = await this.QuestionResponse.bulkCreate(
        questionResponses
      );
      return { questionResponses: questionResponseRecords };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  private async CreateQuestion(surveyId, question) {
    let dataType = inferDataTypeOf(question[1]).dataType;
    console.log(question);
    await this.Question.create({
      questionId: question[0],
      key: question[0],
      questionType: "text", // this is prob bad
      dataType,
      label: question[0], // bad
      rules: null,
      items: null,
      required: true,
      note: null,
      question: question[0] // bad and repetitive XD
    });
    await this.SurveyQuestion.create({
      questionId: question[0],
      surveyId: surveyId
    });
    return { dataType };
  }
  public async PostAnkiCardCollection(
    experimentId: string,
    surveyId: string,
    participantId: string,
    cards: {}
  ): Promise<{ cardCollection: any }> {
    const cardCollection = await this.CardCollection.create({
      experimentId,
      surveyId,
      participantId,
      cards
    }).then(cards => {
      return { cards };
    });
    return { cardCollection };
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
