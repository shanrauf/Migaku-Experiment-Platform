<<<<<<< HEAD
import { Service, Inject } from "typedi";
import winston from "winston";
import { generateSequelizeFilters } from "../../../utils";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../../../decorators/eventDispatcher";
import { Experiment } from "../../../models/experiment";
import { Question } from "../../../models/question";

import * as requests from "./requests";
import * as responses from "./responses";
import { Survey } from "../../../models/survey";
import { Sequelize } from "sequelize-typescript";

@Service()
export default class ExperimentService {
  private sequelizeFilters: object;

  constructor(
    @Inject("Experiment") private experimentModel: typeof Experiment,
    @Inject("Survey") private surveyModel: typeof Survey,
    @Inject("Question") private questionModel: typeof Question,
    @Inject("sequelize") private sqlConnection: Sequelize,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    this.sequelizeFilters = {
      experimentId: experimentId => {
        return {
          include: [
            {
              model: this.experimentModel,
              required: true,
              attributes: [],
              where: { experimentId },
              through: { attributes: [] }
=======
import { Service, Inject } from 'typedi';
import winston from 'winston';
import { randomIdGenerator } from '../../../utils';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../../../decorators/eventDispatcher';
import { Experiment } from '../../../models/experiment';
import { Sequelize } from 'sequelize-typescript';
import { ExperimentQuestion } from '../../../models/intermediary/experimentQuestion';
import { ExperimentRequirement } from '../../../models/intermediary/experimentRequirement';

import * as requests from './requests';
import * as responses from './responses';
import { Survey } from '../../../models/survey';
import { ExperimentParticipant } from '../../../models/intermediary/experimentParticipant';
import { Participant } from '../../../models/participant';

@Service()
export default class QuestionService {
  private sequelizeFilters: object;

  constructor(
    @Inject('Experiment') private experimentModel: typeof Experiment,
    @Inject('ExperimentParticipant')
    private experimentParticipantModel: typeof ExperimentParticipant,
    @Inject('ExperimentQuestion')
    private experimentQuestionModel: typeof ExperimentQuestion,
    @Inject('ExperimentRequirement')
    private experimentRequirementModel: typeof ExperimentRequirement,
    @Inject('Survey') private surveyModel: typeof Survey,
    @Inject('Participant') private participantModel: typeof Participant,
    @Inject('sequelize') private sqlConnection: Sequelize,
    @Inject('logger') private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    this.sequelizeFilters = {
      surveyId: surveyId => {
        return {
          include: [
            {
              model: this.surveyModel,
              required: true,
              as: 'surveys',
              where: { surveyId }
>>>>>>> 0a52e82a347d4d2a360317854040bd9226750c5b
            }
          ]
        };
      },
<<<<<<< HEAD
      surveyId: surveyId => {
        return {
          include: [
            {
              model: this.surveyModel,
              required: true,
              attributes: [],
              where: { surveyId },
              through: { attributes: [] }
=======
      participantId: participantId => {
        return {
          include: [
            {
              model: this.experimentParticipantModel,
              required: true,
              where: { participantId }
>>>>>>> 0a52e82a347d4d2a360317854040bd9226750c5b
            }
          ]
        };
      }
    };
  }

<<<<<<< HEAD
  public async GetQuestions(
    filters?: requests.IQuestionFilters
  ): Promise<responses.IQuestions> {
    this.logger.silly("Fetching questions");
    const queryFilters = await generateSequelizeFilters(
      this.sequelizeFilters,
      filters
    );
    const questionRecords = await this.questionModel.findAndCountAll(
      queryFilters
    );
    if (!questionRecords.rows) {
      return { questions: null, totalCount: 0 };
    }
    return {
      questions: questionRecords.rows,
      totalCount: questionRecords.count
    };
  }
=======
  private async GenerateFilters(filters: object) {
    let where = {};
    let include = [];
    Object.keys(filters).forEach(key => {
      const sequelizeFilter = this.sequelizeFilters[key](filters[key]);
      Object.keys(sequelizeFilter).forEach(filterKey => {
        switch (filterKey) {
          case 'where':
            where = { ...where, ...sequelizeFilter[filterKey] };
          case 'include':
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
    this.logger.silly('Fetching experiments');
    const queryFilters = await this.GenerateFilters(filters);
    const experimentRecords = await this.experimentModel
      .scope('public')
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
      .scope('public')
      .findByPk(experimentId);
    if (!experimentRecord) {
      return { experiment: null };
    }
    return { experiment: experimentRecord };
  }
>>>>>>> 0a52e82a347d4d2a360317854040bd9226750c5b
}
