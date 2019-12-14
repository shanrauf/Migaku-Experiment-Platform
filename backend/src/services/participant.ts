import {
  EventDispatcher,
  EventDispatcherInterface
} from "../decorators/eventDispatcher";
import { Service, Inject } from "typedi";
import winston from "winston";
import { Model } from "sequelize-typescript";

@Service()
export default class ParticipantService {
  constructor(
    @Inject("Participant")
    private Participant: Models.ParticipantModel,
    @Inject("SurveySection") private SurveySection: Models.SurveySectionModel,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}
  questionId;
  public async GetParticipantIdByEmail(email: string) {
    try {
      this.logger.silly("Fetching surveys");
      const participantId = await this.Participant.findOne({
        where: { email }
      })
        .then((participant: any) => {
          return participant.participantId;
        })
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
