import { Container } from "typedi";
import { EventSubscriber, On } from "event-dispatch";
import events from "./events";
import DiscordService from "../services/discord/discord";
import logger from '../loaders/logger';

@EventSubscriber()
export default class SurveySubscriber {
  /**
   * Use another approach like emit events to a queue (rabbitmq/aws sqs),
   * then save the latest in Redis/Memcache or something similar
   */
  @On(events.survey.completeSurvey)
  public async onCompleteSurvey({discordId, role}: {role: string, discordId: string}) {
    const discordService = Container.get(DiscordService);
    try {
      logger.debug(`${events.survey.completeSurvey} event triggered`);
      await discordService.SetDiscordRole(role, discordId);
    } catch (e) {
      logger.error(`🔥 Error on event ${events.survey.completeSurvey}: %o`, e);
      throw e;
    }
  }
}
