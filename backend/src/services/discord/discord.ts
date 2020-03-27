import { ErrorHandler } from './../../utils/index';
import { Service, Inject } from 'typedi';
import { Client } from 'discord.js';
import logger from '../../loaders/logger';
import config from '../../config';
import winston from 'winston';

@Service()
export default class DiscordClient {
  constructor(
    @Inject('discordClient') private discordClient: Client,
    @Inject('logger') private logger: winston.Logger
  ) {}

  public async SetDiscordRole(role: string, discordId: string): Promise<void> {
    try {
      const guild = this.discordClient.guilds.find(
        (discordGuild) => discordGuild.id === config.discord.DISCORD_SERVER
      );
      const roleObj = guild.roles.find((guildRole) => guildRole.name === role);
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
  public async IsMemberOfMIADiscord(discordId: string): Promise<boolean> {
    try {
      const guild = this.discordClient.guilds.find(
        (discordGuild) => discordGuild.id === config.discord.DISCORD_SERVER
      );
      const user = await this.discordClient.fetchUser(discordId, false);
      const member = await guild.fetchMember(user);
      return member.id === discordId;
    } catch (err) {
      throw new ErrorHandler(404, 'There was an issue with Discord');
    }
  }
}
