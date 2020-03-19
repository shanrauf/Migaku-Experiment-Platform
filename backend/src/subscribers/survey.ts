import { Container } from "typedi";
import { EventSubscriber, On } from "event-dispatch";
import events from "./events";
import DiscordClient from "../services/discord/discord";
import logger from '../loaders/logger';

@EventSubscriber()
export default class SurveySubscriber {
  /**
   * Use another approach like emit events to a queue (rabbitmq/aws sqs),
   * then save the latest in Redis/Memcache or something similar
   */
  @On(events.survey.completeSurvey)
  public onCompleteSurvey(role: string, { discordId }: Partial<Express.User>) {
    const Logger = Container.get(logger);
    const discordClient = Container.get<DiscordClient>("discordClient");
    try {
      discordClient.SetDiscordRole(role, discordId);
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.survey.completeSurvey}: %o`, e);
      throw e;
    }
  }
}
