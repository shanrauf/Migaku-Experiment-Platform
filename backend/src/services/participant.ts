import { Service, Inject } from 'typedi';
import winston from 'winston';
import { Model } from 'sequelize-typescript';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../decorators/eventDispatcher';
import models from '../models';

@Service()
export default class ParticipantService {
  constructor(
    @Inject('Participant')
    private Participant: Models.ParticipantModel,
    @Inject('ExperimentParticipant')
    private ExperimentParticipant: Models.ExperimentParticipantModel,
    @Inject('logger') private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}
  public async GetParticipants(
    experimentId?: string
  ): Promise<{
    participants: Model[] | null;
    totalCount: number;
  }> {
    this.logger.silly('Fetching participants');
    if (experimentId) {
      const participantRecords = await this.ExperimentParticipant.findAndCountAll(
        {
          where: { experimentId },
          limit: 10
        }
      );
      if (!participantRecords.rows) {
        return { participants: null, totalCount: 0 };
      }
      return {
        participants: participantRecords.rows,
        totalCount: participantRecords.count
      };
    } else {
      console.log('Here');
      const participantRecords = await this.Participant.findAndCountAll({
        limit: 100
      });
      console.log(participantRecords.rows);
      if (!participantRecords.rows) {
        return { participants: null, totalCount: 0 };
      }
      return {
        participants: participantRecords.rows,
        totalCount: participantRecords.count
      };
    }
  }
  public async GetParticipantIdByEmail(email: string) {
    try {
      this.logger.silly('Fetching surveys');
      const participantId = await this.Participant.findOne({
        where: { email }
      })
        .then((participant: any) => participant.participantId)
        .catch(e => {
          this.logger.error(e);
          throw e;
        });
      return participantId;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
