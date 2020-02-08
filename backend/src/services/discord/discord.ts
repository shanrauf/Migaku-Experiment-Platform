import { Service, Inject } from "typedi";
import { Participant } from "../../models/participant";

@Service()
export default class MailerService {
  constructor(@Inject("emailClient") private emailClient) {}

  public async SetDiscordRole(role: string, user: Participant) {}
}
