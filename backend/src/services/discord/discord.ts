import { Service, Inject } from "typedi";
import { Participant } from "../../models/participant";
import { Client } from "discord.js";

@Service()
export default class DiscordClient {
  constructor(@Inject("discordClient") private discordClient: Client) {}

  public async SetDiscordRole(role: string, discordID: string) {
    const guild = this.discordClient.guilds.array()[0];
    const roleObj = guild.roles.find(`name`, role);
    if (!roleObj) {
      throw new Error(`${roleObj.name} doesn't exist.`)
    }

    const user = await this.discordClient.fetchUser(discordID, false);
    /**
     * TODO: Risky if bot is in multiple servers...
     */
    const member = await guild.fetchMember(user);
    member.addRole(roleObj);
  }
}
