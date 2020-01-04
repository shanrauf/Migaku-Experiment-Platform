import { Service, Inject } from 'typedi';
import winston from 'winston';
import { randomIdGenerator } from '../utils';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../decorators/eventDispatcher';
import { Experiment } from '../models/experiment';
@Service()
export default class ExperimentService {
  constructor(
    @Inject('Experiment') private experimentModel: typeof Experiment,
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

  public async CreateExperiment(experimentObj: {
    experimentId?: string;
    title: string;
    description?: string;
    startDate: string;
    endDate?: string | null;
    visibility: string;
  }): Promise<{ experiment: Experiment | null }> {
    this.logger.silly(`Creating experiment ${experimentObj.experimentId}`);
    if (!experimentObj.hasOwnProperty('experimentId')) {
      experimentObj.experimentId = randomIdGenerator();
    }
    const experimentRecord = await this.experimentModel.create(experimentObj);
    if (!experimentRecord) {
      return { experiment: null };
    }
    return { experiment: experimentRecord };
  }
}
