import { Service, Inject } from "typedi";
import winston from "winston";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../../../decorators/eventDispatcher";
import { ExperimentParticipant } from "../../../models/intermediary/experimentParticipant";
import { Participant } from "../../../models/participant";

@Service()
export default class ParticipantService {
  constructor(
    @Inject("Participant") private participantModel: typeof Participant,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  public async GetParticipants(
    experimentId?: string
  ): Promise<{
    participants: ExperimentParticipant[] | Participant[] | null;
    totalCount: number;
  }> {
    this.logger.silly("Fetching participants");
    if (experimentId) {
      const participantRecords = await ExperimentParticipant.findAndCountAll({
        where: { experimentId },
        limit: 10
      });
      if (!participantRecords.rows) {
        return { participants: null, totalCount: 0 };
      }
      return {
        participants: participantRecords.rows,
        totalCount: participantRecords.count
      };
    }
    this.logger.debug("Here");
    const participantRecords = await Participant.findAndCountAll({
      limit: 100
    });
    this.logger.debug(participantRecords.rows);
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
      this.logger.silly("Getting participant by email");
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
}
