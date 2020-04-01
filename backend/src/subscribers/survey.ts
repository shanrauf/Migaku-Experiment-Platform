import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import DiscordService from '../services/discord/discord';
import logger from '../loaders/logger';

@EventSubscriber()
export default class SurveySubscriber {
  /**
   * Use another approach like emit events to a queue (rabbitmq/aws sqs),
   * then save the latest in Redis/Memcache or something similar
   */
  @On(events.survey.completeSurvey)
  public async onCompleteSurvey({
    discordId,
    role
  }: {
    role: string;
    discordId: string;
  }): Promise<void> {
    const discordService = Container.get(DiscordService);
    try {
      logger.debug(`${events.survey.completeSurvey} event triggered`);
      const member = await discordService.GetMember(discordId);
      await discordService.SetDiscordRole(member, role);
      await discordService.SendMessage(
        member,
        `We just received your submission. As a reward, we gave you the ${role} role, which comes with a few exclusive emojis!`
      );
    } catch (e) {
      logger.error(`🔥 Error on event ${events.survey.completeSurvey}: %o`, e);
      throw e;
    }
  }
}
