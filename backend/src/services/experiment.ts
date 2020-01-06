import { Service, Inject } from 'typedi';
import winston from 'winston';
import { randomIdGenerator } from '../utils';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../decorators/eventDispatcher';
import { Experiment } from '../models/experiment';
import { IExperiment, IRequirement } from '../interfaces/IExperiment';
import { Sequelize } from 'sequelize-typescript';
import { ExperimentQuestion } from '../models/intermediary/experimentQuestion';
import { ExperimentRequirement } from '../models/intermediary/experimentRequirement';
@Service()
export default class ExperimentService {
  constructor(
    @Inject('Experiment') private experimentModel: typeof Experiment,
    @Inject('ExperimentQuestion')
    private experimentQuestionModel: typeof ExperimentQuestion,
    @Inject('ExperimentRequirement')
    private experimentRequirementModel: typeof ExperimentRequirement,
    @Inject('sequelize') private sqlConnection: Sequelize,
    @Inject('logger') private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  public async GetExperimentListings(): Promise<{
    experiments: Experiment[] | null;
    totalCount: number;
  }> {
    this.logger.silly('Fetching experiments');
    const experimentRecords = await this.experimentModel
      .scope('public')
      .findAndCountAll();
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
  ): Promise<{ experiment: Experiment | null }> {
    this.logger.silly(`Fetching experiment ${experimentId}`);
    const experimentRecord = await this.experimentModel
      .scope('public')
      .findByPk(experimentId);
    if (!experimentRecord) {
      return { experiment: null };
    }
    return { experiment: experimentRecord };
  }

  public async CreateExperiment(
    experimentObj: IExperiment
  ): Promise<{ experiment: Experiment }> {
    this.logger.silly(`Creating experiment`);
    try {
      if (!experimentObj.hasOwnProperty('experimentId')) {
        experimentObj['experimentId'] = randomIdGenerator();
      }
      return await this.sqlConnection.transaction(async transaction => {
        const experimentRecord = await this.experimentModel.create(
          experimentObj,
          {
            transaction
          }
        );
        let experimentQuestions = experimentObj.questions.map(questionId => {
          // converting questionId[] to object[] w/ experiment & questionId
          return {
            experimentId: experimentObj['experimentId'],
            questionId
          };
        });
        let experimentRequirements = experimentObj.requirements.map(
          (requirementId: string) => {
            return {
              experimentId: experimentObj['experimentId'],
              requirementId
            };
          }
        );
        await this.experimentQuestionModel.bulkCreate(experimentQuestions, {
          transaction
        });
        await this.experimentRequirementModel.bulkCreate(
          experimentRequirements,
          { transaction }
        );
        return { experiment: experimentRecord };
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
