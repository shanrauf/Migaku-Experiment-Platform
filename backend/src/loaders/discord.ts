import Discord from 'discord.js';

import logger from './logger';
import config from '../config';

const bot = new Discord.Client();

const TOKEN = config.discord.DISCORD_TOKEN;
const patreonRoleId = '384145495070736385';
const modRoleId = '384141382949928991';
const adminRoleId = '577986029802225664';
const fluentRoleId = '425513975669587978';
const whitelistedRoles = [modRoleId, adminRoleId, fluentRoleId];
const membersOfMIADiscordThatAreNotPatrons: {
  [id: string]: {
    member: Discord.GuildMember;
    /**
     * Unix timestamp
     */
    warningTimestamp: number;
  };
} = {};

/* 1.8e7 = Every hour */
const pruneJobInterval = 3.6e6;
const fiveHours = 1.8e7;
const oneWeekTimestamp = 6.048e8;

/**
 * Function that runs every hour and checks if a member has not been a patron for longer than five hours.
 * @param bot Discord Client
 */
const MIADiscordMembersPruneJob = async (bot: Discord.Client) => {
  const guild = await bot.guilds
    .find((discordGuild) => discordGuild.id === config.discord.DISCORD_SERVER)
    .fetchMembers();

  guild.members.forEach((member) => {
    const oneWeekSinceJoinedMIADiscord =
      Date.now() - member.joinedAt.getTime() > oneWeekTimestamp;
    if (
      /** Not a bot */
      !member.user.bot &&
      /** Not a mod/admin/fluent */
      !member.roles.find((role) => whitelistedRoles.includes(role.id)) &&
      /** Missing the Patron badge */
      !member.roles.find((role) => role.id === patreonRoleId)
    ) {
      if (
        !membersOfMIADiscordThatAreNotPatrons[member.id] &&
        oneWeekSinceJoinedMIADiscord
      ) {
        membersOfMIADiscordThatAreNotPatrons[member.id] = {
          member,
          warningTimestamp: Date.now()
        };
        logger.info(`${member.id} added to non-members cache.`);
        member.send(
          'We noticed that you no longer have the Patron role on Discord. The bot will automatically remove you from the MIA Discord server in 6 hours unless you become a Patron again and receive the Patron Discord role. If you believe this is a mistake, DM Matt or Yoga on Discord or on Patreon.'
        );
      } else if (
        /**
         * It has been 5 hours since the bot messaged the user about not being a patron.
         */
        membersOfMIADiscordThatAreNotPatrons[member.id]?.warningTimestamp +
          fiveHours <
        Date.now()
      ) {
        member
          .kick(
            'You are no longer pledging to the MIA Patreon. If this is a mistake, please DM us on Discord or message us on the Mass Immersion Approach Patreon.'
          )
          .then(() => {
            delete membersOfMIADiscordThatAreNotPatrons[member.id];
            logger.info(`Kicked ${member.id} from the MIA Discord.`);
          })
          .catch((err) => {
            logger.warn(err);
          });
      }
    }
  });
};

export default async (): Promise<Discord.Client> => {
  try {
    bot.login(TOKEN);

    bot.on('ready', () => {
      logger.silly(`Logged in as ${bot.user.tag}!`);

      /**
       * CRON job to remove MIA Discord members who are no longer patrons.
       * TODO: Mock and test this before pushing into prod.
       * TODO: Use a Redis store for persistence in the case of server restarts
       */
      if (process.env.NODE_ENV === 'production') {
        // setInterval(() => MIADiscordMembersPruneJob(bot), pruneJobInterval);
        logger.info('MIA Discord Patreon prune job initialized.');
      }
    });

    logger.info('✌️ Discord client initialized!');
    return bot;
  } catch (err) {
    logger.error('🔥 Error on Discord bot initialization: %o', err);
    throw err;
  }
};
