import { Service, Inject } from 'typedi';
import winston from 'winston';
import { ExperimentParticipant } from '../../../models/intermediary/experimentParticipant';
import { Participant } from '../../../models/participant';
import { Experiment } from '../../../models/experiment';
import { generateSequelizeFilters } from '../../../utils';
import * as requests from './requests';

@Service()
export default class ParticipantService {
  private sequelizeFilters: object;

  constructor(
    @Inject('Participant') private participantModel: typeof Participant,
    @Inject('Experiment') private experimentModel: typeof Experiment,
    @Inject('logger') private logger: winston.Logger
  ) {
    this.sequelizeFilters = {
      participantId: (participantId) => {
        return {
          where: { participantId }
        };
      },
      experimentId: (experimentId) => {
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

  public async GetParticipants(
    filters?: requests.ParticipantFilters
  ): Promise<{
    participants: ExperimentParticipant[] | Participant[] | null;
    totalCount: number;
  }> {
    this.logger.silly('Fetching participants');
    const queryFilters = generateSequelizeFilters(
      this.sequelizeFilters,
      filters
    );
    const participantRecords = await this.participantModel.findAndCountAll(
      queryFilters
    );
    if (!participantRecords.rows) {
      return { participants: null, totalCount: 0 };
    }
    return {
      participants: participantRecords.rows,
      totalCount: participantRecords.count
    };
  }

  public async GetParticipantIdByEmail(email: string): Promise<string> {
    try {
      this.logger.silly('Getting participant by email');
      const participant = await this.participantModel.findOne({
        where: { email }
      });
      if (!participant) {
        return null; // results in returning 0 to anki unlike below error
        // throw new Error("Participant email doesn't exist");
      }
      return participant.participantId;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async CreateParticipant(
    participant: requests.ParticipantSignup
  ): Promise<Participant> {
    this.logger.silly('Creating participant.');
    return await this.participantModel.create(participant);
  }
}
