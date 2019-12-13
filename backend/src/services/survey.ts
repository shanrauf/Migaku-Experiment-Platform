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
import { Model } from "sequelize-typescript";
@Service()
export default class SurveyService {
  constructor(
    @Inject("ExperimentSurvey")
    private ExperimentSurvey: Models.ExperimentSurvey,
    @Inject("Survey") private Survey: Models.Survey,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  public async GetSurveys(
    experimentId?: string
  ): Promise<{
    surveys: Model[];
    totalCount: number;
  }> {
    let where = {};
    if (experimentId) {
      const surveyRecords = await this.ExperimentSurvey.findAndCountAll({
        where: { experimentId },
        // offset: 10, implement pagination with this later
        limit: 10
      });
    }
    this.logger.silly("Fetching surveys");
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
    surveyId: string
  ): Promise<{ survey: Model | null }> {
    this.logger.silly("Fetching latest survey");
    const surveyRecord = await this.ExperimentSurvey.findOne({
      where: { visibility: "public" },
      order: [["startDate", "DESC"]]
    });
    if (!surveyRecord) {
      return { survey: null };
    }
    return { survey: surveyRecord };
  }
}
