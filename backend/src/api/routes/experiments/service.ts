import { Service, Inject } from 'typedi';
import winston from 'winston';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';

import * as requests from './requests';
import * as responses from './responses';
import { Survey } from '../../../models/survey';
import { Experiment } from '../../../models/experiment';
import { ExperimentQuestion } from '../../../models/intermediary/experimentQuestion';
import { ExperimentRequirement } from '../../../models/intermediary/experimentRequirement';
import { ExperimentParticipant } from '../../../models/intermediary/experimentParticipant';
import { Participant } from '../../../models/participant';
import { QuestionResponse } from '../../../models/questionResponse';
import { SurveyResponse } from '../../../models/surveyResponse';
import { CardCollection } from '../../../models/cardCollection';
import { SurveySection } from '../../../models/surveySection';
import { SurveySectionQuestion } from '../../../models/intermediary/surveySectionQuestion';
import { randomIdGenerator, generateSequelizeFilters } from '../../../utils';

@Service()
export default class ExperimentService {
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
    @Inject('SurveyResponse')
    private surveyResponseModel: typeof SurveyResponse,
    @Inject('SurveySection') private surveySectionModel: typeof SurveySection,
    @Inject('SurveySectionQuestion')
    private surveySectionQuestionModel: typeof SurveySectionQuestion,
    @Inject('QuestionResponse')
    private questionResponseModel: typeof QuestionResponse,
    @Inject('CardCollection')
    private cardCollectionModel: typeof CardCollection,
    @Inject('sequelize') private sqlConnection: Sequelize,
    @Inject('logger') private logger: winston.Logger
  ) {
    this.sequelizeFilters = {
      surveyId: surveyId => {
        return {
          include: [
            {
              model: this.surveyModel,
              required: true,
              attributes: [],
              where: { surveyId }
            }
          ]
        };
      },
      participantId: participantId => {
        return {
          include: [
            {
              model: this.participantModel,
              required: true,
              where: { participantId },
              attributes: [],
              through: { attributes: [] }
            }
          ]
        };
      },
      experimentId: experimentId => {
        return {
          where: { experimentId }
        };
      },
      visibility: visibility => {
        return {
          where: { visibility }
        };
      }
    };
  }

  /**
   * Gets all experiments that satisfy filters
   */
  public async GetExperiments(
    filters?: requests.ExperimentFilters
  ): Promise<responses.IExperiments> {
    this.logger.silly('Fetching experiments');
    const queryFilters = generateSequelizeFilters(
      this.sequelizeFilters,
      filters
    );
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

  /**
   * Gets experiment by experimentId
   */
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

  /**
   * Permanently delete experiment.
   * TODO: Test...
   */
  public async DeleteExperiment(
    experimentId: string
  ): Promise<responses.IDeleteExperiment> {
    try {
      this.logger.silly(`Deleting experiment ${experimentId}`);
      return await this.sqlConnection.transaction(async transaction => {
        /**
         * Delete all question responses, survey responses, surveys, and requirements under this experiment
         */
        await Promise.all([
          this.DeleteAssociatedQuestionResponses(experimentId, transaction),
          this.DeleteAssociatedSurveyResponses(experimentId, transaction),
          this.DeleteAssociatedSurveys(experimentId, transaction),
          this.DeleteAssociatedRequirements(experimentId, transaction),
          this.DeleteAssociatedCardCollections(experimentId, transaction)
        ]);
        return {
          deletedCount: await this.experimentModel.destroy({
            where: { experimentId }
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
  public async RegisterParticipant(
    experimentId: string,
    participantId: string
  ): Promise<responses.IExperimentParticipant> {
    try {
      this.logger.silly(
        `Registering ${participantId} for experiment ${experimentId}`
      );
      return {
        participant: await this.experimentParticipantModel.findOrCreate({
          where: { experimentId, participantId },
          defaults: {
            experimentId,
            participantId,
            registerDate: new Date(Date.now())
          }
        })[0]
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  /**
   * Creates an experiment.
   */
  public async CreateExperiment(
    experiment: requests.IExperiment
  ): Promise<responses.IExperiment> {
    try {
      if (!experiment['experimentId']) {
        experiment['experimentId'] = randomIdGenerator();
      }
      this.logger.silly(`Creating experiment ${experiment['experimentId']}`);
      return await this.sqlConnection.transaction(async transaction => {
        const experimentRecord = await this.experimentModel.create(experiment, {
          transaction
        });
        await this.AssociateQuestionsAndRequirements(
          experiment.experimentId,
          experiment.questions,
          experiment.requirements,
          transaction
        );
        return { experiment: experimentRecord };
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  /**
   * Adds questions to the list of questions that the experiment collects data on.
   */
  public async AddQuestionsToExperimentSchema(
    experimentId: string,
    questionIds: string[]
  ): Promise<void> {
    await this.AssociateQuestionsWithExperiment(experimentId, questionIds);
  }

  /**
   * Helper method to try concurrently associating questions and requirements
   * if quesstionIds[] and requirementIds[] aren't null.
   * TODO: Test... what happens if one of the two methods fail when running concurrently...
   */
  private async AssociateQuestionsAndRequirements(
    experimentId: string,
    questionIds: string[],
    requirementIds: string[],
    transaction?: Transaction
  ): Promise<void> {
    if (questionIds.length && requirementIds.length) {
      await Promise.all([
        this.AssociateQuestionsWithExperiment(
          experimentId,
          questionIds,
          transaction
        ),
        this.AssociateRequirementsWithExperiment(
          experimentId,
          requirementIds,
          transaction
        )
      ]);
    } else if (questionIds.length) {
      await this.AssociateQuestionsWithExperiment(
        experimentId,
        questionIds,
        transaction
      );
    } else if (requirementIds.length) {
      await this.AssociateRequirementsWithExperiment(
        experimentId,
        requirementIds,
        transaction
      );
    }
  }

  /**
   * Associates questions with experiment.
   */
  private async AssociateQuestionsWithExperiment(
    experimentId: string,
    questionIds: string[],
    transaction?: Transaction
  ): Promise<void> {
    await this.experimentQuestionModel.bulkCreate(
      questionIds.map(questionId => {
        return {
          experimentId,
          questionId
        };
      }),
      { transaction }
    );
  }

  /**
   * Delete all question responses under this experiment
   */
  private async DeleteAssociatedQuestionResponses(
    experimentId: string,
    transaction?: Transaction
  ): Promise<void> {
    try {
      await this.questionResponseModel.destroy({
        where: { experimentId },
        transaction
      });
    } catch (err) {
      throw err;
    }
  }

  private async DeleteAssociatedSurveyResponses(
    experimentId: string,
    transaction?: Transaction
  ): Promise<void> {
    try {
      await this.surveyResponseModel.destroy({
        where: { experimentId },
        transaction
      });
    } catch (err) {
      throw err;
    }
  }

  private async DeleteAssociatedSurveys(
    experimentId: string,
    transaction?: Transaction
  ): Promise<void> {
    try {
      const surveyIds = await this.surveyModel.findAll({
        attributes: ['surveyId'],
        where: { experimentId },
        transaction
      });

      const promises = [];
      for (let surveyId of surveyIds) {
        promises.push(
          this.DeleteAssociatedSurveySections(surveyId, transaction)
        );
      }
      await Promise.all(promises);

      await this.surveyModel.destroy({
        where: { experimentId },
        transaction
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Deletes all survey sections associated with these surveyIds
   * @param surveyIds string, but surveyModel.findAll type is Survey[] so I have to set the function signature to any
   */
  private async DeleteAssociatedSurveySections(
    surveyId: any,
    transaction?: Transaction
  ) {
    const sectionIds = await this.surveySectionModel.findAll({
      attributes: ['sectionId'],
      where: { surveyId },
      transaction
    });

    const promises = [];
    for (let sectionId of sectionIds) {
      promises.push(
        this.DeleteAssociatedSurveySectionQuestions(sectionId, transaction)
      );
    }
    await Promise.all(promises);

    await this.surveySectionModel.destroy({
      where: { surveyId },
      transaction
    });
  }

  private async DeleteAssociatedSurveySectionQuestions(
    sectionId: any,
    transaction?: Transaction
  ): Promise<void> {
    await this.surveySectionQuestionModel.destroy({
      where: { sectionId },
      transaction
    });
  }

  private async DeleteAssociatedRequirements(
    experimentId: string,
    transaction?: Transaction
  ): Promise<void> {
    await this.experimentRequirementModel.destroy({
      where: { experimentId },
      transaction
    });
  }

  private async DeleteAssociatedCardCollections(
    experimentId: string,
    transaction?: Transaction
  ): Promise<void> {
    await this.cardCollectionModel.destroy({
      where: { experimentId },
      transaction
    });
  }

  private async AssociateRequirementsWithExperiment(
    experimentId: string,
    requirementIds: string[],
    transaction?: Transaction
  ): Promise<void> {
    await this.experimentRequirementModel.bulkCreate(
      requirementIds.map(requirementId => {
        return {
          experimentId,
          requirementId
        };
      }),
      { transaction }
    );
  }
  /**
   * Drops the participant from the experiment.
   */
  public async DropParticipant(
    experimentId: string,
    participantId: string
  ): Promise<void> {
    await this.experimentParticipantModel.update(
      {
        dropoutDate: new Date(Date.now())
      },
      {
        where: { experimentId, participantId }
      }
    );
  }
}
