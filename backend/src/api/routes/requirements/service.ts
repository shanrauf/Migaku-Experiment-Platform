import { Service, Inject } from 'typedi';
import winston from 'winston';
import { Sequelize } from 'sequelize-typescript';
import * as requests from './requests';
import * as responses from './responses';
import { Experiment } from '../../../models/experiment';
import { ExperimentRequirement } from '../../../models/intermediary/experimentRequirement';
import { generateSequelizeFilters } from '../../../utils';
import { Requirement } from '../../../models/requirement';

@Service()
export default class RequirementService {
  private sequelizeFilters: object;

  constructor(
    @Inject('Experiment') private experimentModel: typeof Experiment,
    @Inject('Requirement') private requirementModel: typeof Requirement,
    @Inject('ExperimentRequirement')
    private experimentRequirementModel: typeof ExperimentRequirement,
    @Inject('sequelize') private sqlConnection: Sequelize,
    @Inject('logger') private logger: winston.Logger
  ) {
    this.sequelizeFilters = {
      experimentId: (experimentId: string): object => {
        return {
          include: [
            {
              model: this.experimentModel,
              required: true,
              where: { experimentId },
              attributes: [],
              through: { attributes: [] }
            }
          ]
        };
      }
    };
  }

  /**
   * Gets all requirements that satisfy filters
   */
  public async GetRequirements(
    filters?: requests.RequirementFilters
  ): Promise<responses.Requirements> {
    this.logger.silly('Fetching requirements');
    const queryFilters = generateSequelizeFilters(
      this.sequelizeFilters,
      filters
    );
    const requirementRecords = await this.requirementModel.findAndCountAll(
      queryFilters
    );
    if (!requirementRecords.rows) {
      return { requirements: null, totalCount: 0 };
    }
    return {
      requirements: requirementRecords.rows,
      totalCount: requirementRecords.count
    };
  }

  /**
   * Gets requirement by requirementId
   */
  public async GetRequirement(
    requirementId: string
  ): Promise<responses.IRequirement> {
    this.logger.silly(`Fetching requirement ${requirementId}`);
    const requirementRecord = await this.requirementModel.findByPk(
      requirementId
    );
    if (!requirementRecord) {
      return { requirement: null };
    }
    return { requirement: requirementRecord };
  }

  /**
   * Permanently delete requirement.
   */
  public async DeleteRequirement(
    requirementId: string
  ): Promise<responses.IDeleteRequirement> {
    try {
      this.logger.silly(`Deleting experiment ${requirementId}`);
      return await this.sqlConnection.transaction(async (transaction) => {
        await this.experimentRequirementModel.destroy({
          where: { requirementId },
          transaction
        });
        return {
          deletedCount: await this.requirementModel.destroy({
            where: { requirementId },
            transaction
          })
        };
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  /**
   * Registers participant for the experiment.
   */
  public async AddRequirementToExperiment(
    requirementId: string,
    experimentId: string
  ): Promise<object> {
    try {
      this.logger.silly(
        `Adding ${requirementId} for experiment ${experimentId}`
      );
      return {
        requirement: await this.experimentRequirementModel.findOrCreate({
          where: { experimentId, requirementId },
          defaults: {
            experimentId,
            requirementId
          }
        })[0]
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  /**
   * Creates a requirement.
   */
  public async CreateRequirement(
    requirement: object
  ): Promise<responses.IRequirement> {
    try {
      this.logger.silly(`Creating requirement ${requirement['requirementId']}`);
      return { requirement: await this.requirementModel.create(requirement) };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
