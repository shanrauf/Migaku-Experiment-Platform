import { Service, Inject } from 'typedi';
import winston from 'winston';
import { randomIdGenerator, generateSequelizeFilters } from '../../../utils';
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
import { Question } from '../../../models/question';

@Service()
export default class QuestionService {
  private sequelizeFilters: object;

  constructor(
    @Inject('Experiment') private experimentModel: typeof Experiment,
    @Inject('ExperimentParticipant')
    private experimentParticipantModel: typeof ExperimentParticipant,
    @Inject('Question') private questionModel: typeof Question,
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
      experimentId: experimentId => {
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
      },
      surveyId: surveyId => {
        return {
          include: [
            {
              model: this.surveyModel,
              required: true,
              as: 'surveys',
              where: { surveyId },
              attributes: [],
              through: { attributes: [] }
            }
          ]
        };
      }
    };
  }

  public async GetQuestions(
    filters?: requests.IQuestionFilters
  ): Promise<responses.IQuestions> {
    this.logger.silly('Fetching questions');
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
  public async CreateQuestions(questions: requests.IQuestion[]): Promise<void> {
    try {
      await this.questionModel.bulkCreate(questions);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
