import { Service, Inject } from "typedi";
import winston from "winston";
import { randomIdGenerator } from "../../../utils";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../../../decorators/eventDispatcher";
import { Experiment } from "../../../models/experiment";
import { Sequelize } from "sequelize-typescript";
import { ExperimentQuestion } from "../../../models/intermediary/experimentQuestion";
import { ExperimentRequirement } from "../../../models/intermediary/experimentRequirement";

import * as requests from "./requests";
import * as responses from "./responses";
import { Survey } from "../../../models/survey";
import { ExperimentParticipant } from "../../../models/intermediary/experimentParticipant";
import { Participant } from "../../../models/participant";

@Service()
export default class ExperimentService {
  private sequelizeFilters: object;

  constructor(
    @Inject("Experiment") private experimentModel: typeof Experiment,
    @Inject("ExperimentParticipant")
    private experimentParticipantModel: typeof ExperimentParticipant,
    @Inject("ExperimentQuestion")
    private experimentQuestionModel: typeof ExperimentQuestion,
    @Inject("ExperimentRequirement")
    private experimentRequirementModel: typeof ExperimentRequirement,
    @Inject("Survey") private surveyModel: typeof Survey,
    @Inject("Participant") private participantModel: typeof Participant,
    @Inject("sequelize") private sqlConnection: Sequelize,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    this.sequelizeFilters = {
      surveyId: surveyId => {
        return {
          include: [
            {
              model: this.surveyModel,
              required: true,
              as: "surveys",
              where: { surveyId }
            }
          ]
        };
      },
      participantId: participantId => {
        return {
          include: [
            {
              model: this.experimentParticipantModel,
              required: true,
              where: { participantId }
            }
          ]
        };
      }
    };
  }

  private async GenerateFilters(filters: object) {
    let where = {};
    let include = [];
    Object.keys(filters).forEach(key => {
      const sequelizeFilter = this.sequelizeFilters[key](filters[key]);
      Object.keys(sequelizeFilter).forEach(filterKey => {
        switch (filterKey) {
          case "where":
            where = { ...where, ...sequelizeFilter[filterKey] };
          case "include":
            include.push(...sequelizeFilter[filterKey]);
        }
      });
    });
    return {
      where,
      include
    };
  }

  public async GetExperiments(
    filters?: requests.IExperimentFilters
  ): Promise<responses.IExperiments> {
    this.logger.silly("Fetching experiments");
    const queryFilters = await this.GenerateFilters(filters);
    const experimentRecords = await this.experimentModel
      .scope("public")
      .findAndCountAll(queryFilters);
    if (!experimentRecords.rows) {
      return { experiments: null, totalCount: 0 };
    }
    return {
      experiments: experimentRecords.rows,
      totalCount: experimentRecords.count
    };
  }

  public async GetExperiment(
    experimentId: string
  ): Promise<responses.IExperiment> {
    this.logger.silly(`Fetching experiment ${experimentId}`);
    const experimentRecord = await this.experimentModel
      .scope("public")
      .findByPk(experimentId);
    if (!experimentRecord) {
      return { experiment: null };
    }
    return { experiment: experimentRecord };
  }

  public async DeleteExperiment(experimentId: string): Promise<number> {
    try {
      return await this.experimentModel.destroy({
        where: { experimentId }
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public async GetParticipants(
    experimentId: string
  ): Promise<responses.IExperimentParticipants> {
    try {
      const participantRecords = await this.participantModel.findAndCountAll({
        include: [
          {
            model: this.experimentParticipantModel,
            where: { experimentId }
          }
        ]
      });
      return {
        participants: participantRecords.rows,
        totalCount: participantRecords.count
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public async RegisterParticipant(
    experimentId: string,
    participantId: string
  ): Promise<responses.IExperimentParticipant> {
    try {
      const experimentParticipantRecord = await this.experimentParticipantModel.findOrCreate(
        {
          where: { experimentId, participantId },
          defaults: {
            experimentId,
            participantId,
            registerDate: new Date(Date.now())
          }
        }
      );
      return { participant: experimentParticipantRecord[0] };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public async CreateExperiment(
    experimentObj: requests.IExperiment
  ): Promise<{ experiment: Experiment }> {
    this.logger.silly(`Creating experiment`);
    try {
      if (!experimentObj["experimentId"]) {
        experimentObj["experimentId"] = randomIdGenerator();
      }
      return await this.sqlConnection.transaction(async transaction => {
        const experimentRecord = await this.experimentModel.create(
          experimentObj,
          {
            transaction
          }
        );
        if (experimentObj.questions) {
          let experimentQuestions = experimentObj.questions.map(questionId => {
            // converting questionId[] to object[] w/ experiment & questionId
            return {
              experimentId: experimentObj["experimentId"],
              questionId
            };
          });
          await this.experimentQuestionModel.bulkCreate(experimentQuestions, {
            transaction
          });
        }

        if (experimentObj.requirements) {
          let experimentRequirements = experimentObj.requirements.map(
            (requirementId: string) => {
              return {
                experimentId: experimentObj["experimentId"],
                requirementId
              };
            }
          );
          await this.experimentRequirementModel.bulkCreate(
            experimentRequirements,
            { transaction }
          );
        }

        return { experiment: experimentRecord };
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
