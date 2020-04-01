import { ErrorHandler } from './../../utils/index';
import { Service, Inject } from 'typedi';
import Discord from 'discord.js';

import winston from 'winston';
import { promises as fs } from 'fs';
import path from 'path';

import logger from '../../loaders/logger';
import config from '../../config';

@Service()
export default class DiscordClient {
  constructor(
    @Inject('discordClient') private discordClient: Discord.Client,
    @Inject('logger') private logger: winston.Logger
  ) {}

  public async SetDiscordRole(
    member: Discord.GuildMember,
    role: string
  ): Promise<void> {
    try {
      const guild = await this.GetMIADiscord();
      const roleObj = await this.GetRoleByName(role);
      if (!roleObj) {
        throw new Error(`${role} doesn't exist.`);
      }
      await member.addRole(roleObj);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
  private async GetMIADiscord(): Promise<Discord.Guild> {
    return this.discordClient.guilds.find(
      (discordGuild) => discordGuild.id === config.discord.DISCORD_SERVER
    );
  }
  public async IsMemberOfMIADiscord(discordId: string): Promise<boolean> {
    try {
      const guild = await this.GetMIADiscord();
      const user = await this.GetUser(discordId);
      const member = await guild.fetchMember(user);
      return member.id === discordId;
    } catch (err) {
      return false;
    }
  }

  public async GetUser(discordId: string) {
    return await this.discordClient.fetchUser(discordId, false);
  }

  public async GetMember(discordId: string) {
    const guild = await this.GetMIADiscord();
    const user = await this.discordClient.fetchUser(discordId, false);
    return await guild.fetchMember(user);
  }

  private async GetRoleById(roleId: string): Promise<Discord.Role> {
    const guild = await this.GetMIADiscord();
    const role = guild.roles.find((guildRole) => guildRole.id === roleId);
    if (!role) {
      throw new ErrorHandler(404, `${roleId} doesn't exist.`);
    }
    return role;
  }

  private async GetRoleByName(roleName: string): Promise<Discord.Role> {
    const guild = await this.GetMIADiscord();
    const role = guild.roles.find((guildRole) => guildRole.name === roleName);
    if (!role) {
      throw new ErrorHandler(404, `${roleName} doesn't exist.`);
    }
    return role;
  }

  public async SendMessage(
    member: Discord.GuildMember,
    message: string
  ): Promise<void> {
    await member.send(message);
  }

  public async CreateEmojis(): Promise<void> {
    const guild = await this.GetMIADiscord();
    const ankiSurvey = ['anki.png', 'miaYoga.png'];
    const surveyOne = ['miaMatt.png', 'miaCringe.png'];
    const surveyTwo = ['miaThink.png', 'miaYoga2.png'];
    const surveyThree = ['mia.png', 'miaOld.png'];
    const rewards = [
      { emojis: ankiSurvey, role: 'SRStatistician' },
      { emojis: surveyOne, role: 'Acquisition Apprentice' },
      { emojis: surveyTwo, role: 'SRSergeant' },
      { emojis: surveyThree, role: 'Immersionaut' }
    ];
    for (const reward of rewards) {
      for (const imageUrl of reward.emojis) {
        const image = await fs.readFile(
          path.resolve('src/assets/emojis/', imageUrl)
        );
        const role = await this.GetRoleByName(reward.role);
        guild.createEmoji(image, imageUrl.split('.')[0], [role]);
      }
    }
  }
}
