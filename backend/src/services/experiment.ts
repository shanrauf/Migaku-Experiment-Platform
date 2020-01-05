import { Service, Inject } from 'typedi';
import winston from 'winston';
import { randomIdGenerator } from '../utils';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../decorators/eventDispatcher';
import { Experiment } from '../models/experiment';
import { IExperiment } from '../interfaces/IExperiment';
import { Sequelize } from 'sequelize-typescript';
import { ExperimentQuestion } from '../models/intermediary/experimentQuestion';
@Service()
export default class ExperimentService {
  constructor(
    @Inject('Experiment') private experimentModel: typeof Experiment,
    @Inject('ExperimentQuestion')
    private experimentQuestionModel: typeof ExperimentQuestion,
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
        await this.experimentQuestionModel.bulkCreate(experimentQuestions, {
          transaction
        });
        return { experiment: experimentRecord };
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
