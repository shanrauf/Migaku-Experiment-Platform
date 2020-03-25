import { Service, Inject } from 'typedi';
import { Participant } from '../../models/participant';
import { Client } from 'discord.js';
import logger from '../../loaders/logger';
import config from '../../config';
@Service()
export default class DiscordClient {
  constructor(@Inject('discordClient') private discordClient: Client) {}

  public async SetDiscordRole(role: string, discordId: string): Promise<void> {
    try {
      /**
       * TODO: Risky if bot is in multiple servers...
       */
      const guild = this.discordClient.guilds.find(
        discordGuild => discordGuild.id === config.discord.DISCORD_SERVER
      );
      const roleObj = guild.roles.find(guildRole => guildRole.name === role);
      if (!roleObj) {
        throw new Error(`${role} doesn't exist.`);
      }

      const user = await this.discordClient.fetchUser(discordId, false);
      const member = await guild.fetchMember(user);
      await member.addRole(roleObj);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
