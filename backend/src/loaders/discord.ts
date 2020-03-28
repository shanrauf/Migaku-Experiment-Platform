import Discord from 'discord.js';

import logger from './logger';
import config from '../config';

const bot = new Discord.Client();

const TOKEN = config.discord.DISCORD_TOKEN;

export default async (): Promise<Discord.Client> => {
  try {
    bot.login(TOKEN);

    bot.on('ready', () => {
      logger.silly(`Logged in as ${bot.user.tag}!`);
    });

    logger.info('✌️ Discord client initialized!');
    return bot;
  } catch (err) {
    logger.error('🔥 Error on passport initialization: %o', err);
    throw err;
  }
};
