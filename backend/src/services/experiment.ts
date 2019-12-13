import {
  EventDispatcher,
  EventDispatcherInterface
} from "../decorators/eventDispatcher";
import { Service, Inject } from "typedi";
import winston from "winston";
import { randomIdGenerator } from "../utils";
import { Model } from "sequelize-typescript";
@Service()
export default class ExperimentService {
  constructor(
    @Inject("Experiment") private Experiment: Models.Experiment,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  public async GetExperimentListings(): Promise<{
    experiments: Model[] | null;
    totalCount: number;
  }> {
    this.logger.silly("Fetching experiments");
    const experimentRecords = await this.Experiment.findAndCountAll({
      // offset: 10, implement pagination with this later
      limit: 10
    });
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
  ): Promise<{ experiment: Model | null }> {
    this.logger.silly(`Fetching experiment ${experimentId}`);
    const experimentRecord = await this.Experiment.findByPk(experimentId);
    if (!experimentRecord) {
      return { experiment: null };
    }
    return { experiment: experimentRecord };
  }
  public async CreateExperiment(experimentObj: {
    experimentId?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string | null;
    visibility: string;
  }): Promise<{ experiment: Model | null }> {
    if !("experimentId" in experimentObj) {
      this.logger.silly("Generating random ID");
      experimentObj["experimentId"] = randomIdGenerator();
    }
    this.logger.silly(`Creating experiment ${experimentObj.experimentId}`);
    const experimentRecord = await this.Experiment.create(experimentObj);
    if (!experimentRecord) {
      return { experiment: null };
    }
    return { experiment: experimentRecord };
  }
}
