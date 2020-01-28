import { Container } from "typedi";
import { EventSubscriber, On } from "event-dispatch";
import { ModelCtor } from "sequelize/types";
import { Model } from "sequelize-typescript";
import events from "./events";
import { Participant } from "../models/participant";

@EventSubscriber()
export default class ParticipantSubscriber {
  /**
   * A great example of an event that you want to handle
   * save the last time a user signin, your boss will be pleased.
   *
   * Altough it works in this tiny toy API, please don't do this for a production product
   * just spamming insert/update to mongo will kill it eventualy
   *
   * Use another approach like emit events to a queue (rabbitmq/aws sqs),
   * then save the latest in Redis/Memcache or something similar
   */
  @On(events.participant.signIn)
  public onUserSignIn({ participantId }: Partial<Participant>) {
    const Logger = Container.get("logger");

    try {
      const Participant = Container.get("Participant") as ModelCtor<Model>;

      Participant.update(
        { lastLogin: new Date() },
        { where: { participantId } }
      );
    } catch (e) {
      // Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

      // Throw the error so the process die (check src/server.ts)
      throw e;
    }
  }

  @On(events.participant.signUp)
  public onUserSignUp({ name, email, participantId }: Partial<Participant>) {
    const Logger = Container.get("logger");

    try {
      /**
       * @TODO implement this
       */
      // Call the tracker tool so your investor knows that there is a new signup
      // and leave you alone for another hour.
      // TrackerService.track('user.signup', { email, participantId })
      // Start your email sequence or whatever
      // MailService.startSequence('user.welcome', { email, name })
    } catch (e) {
      // Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);

      // Throw the error so the process dies (check src/server.ts)
      throw e;
    }
  }
}
