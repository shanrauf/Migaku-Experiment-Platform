import { Service, Inject } from 'typedi';
import winston from 'winston';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../../../decorators/eventDispatcher';
import { Experiment } from '../../../models/experiment';
import { Sequelize } from 'sequelize-typescript';
import { QuestionResponse } from '../../../models/questionResponse';
import { Question } from '../../../models/question';

import sequelize from 'sequelize';

@Service()
export default class QuestionResponseService {
  constructor(
    @Inject('QuestionResponse')
    private questionResponseModel: typeof QuestionResponse,
    @Inject('Question')
    private questionModel: typeof Question,
    @Inject('sequelize') private sqlConnection: Sequelize,
    @Inject('logger') private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  public async TestData(): Promise<QuestionResponse[][]> {
    this.logger.silly('Test data');
    const audioOverallRetention = await this.questionResponseModel.findAll({
      where: { questionId: 'audioOverallRetention' },
      attributes: [
        [
          sequelize.fn('AVG', sequelize.col('answerFloat')),
          'avg_audio_retention'
        ]
      ],
      group: ['surveyId']
    });
    const sentenceOverallRetention = await this.questionResponseModel.findAll({
      where: { questionId: 'textOverallRetention' },
      attributes: [
        [
          sequelize.fn('AVG', sequelize.col('answerFloat')),
          'avg_sentence_retention'
        ]
      ],
      group: ['surveyId']
    });
    return [audioOverallRetention, sentenceOverallRetention];
  }
}
