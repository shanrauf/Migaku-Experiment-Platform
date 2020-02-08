import Discord from "discord.js";

import logger from "./logger";
import botCommands from "../services/discord/commands";
import config from "../config";

const bot = new Discord.Client();
bot["commands"] = new Discord.Collection();

const TOKEN = config.discord.DISCORD_TOKEN;

export default async (): Promise<Discord.Client> => {
  try {
    Object.keys(botCommands).map(key => {
      bot["commands"].set(botCommands[key].name, botCommands[key]);
    });

    bot.login(TOKEN);

    bot.on("ready", () => {
      logger.silly(`Logged in as ${bot.user.tag}!`);
    });

    bot.on("message", msg => {
      const args = msg.content.split(/ +/);
      const command = args.shift().toLowerCase();
      logger.silly(`Called command: ${command}`);

      if (!bot["commands"].has(command)) return;

      try {
        bot["commands"].get(command).execute(msg, args);
      } catch (error) {
        logger.error(error);
        msg.reply("An error occured when executing that command.");
      }
    });
    logger.info("✌️ Discord client initialized!");
    return bot;
  } catch (err) {
    logger.error("🔥 Error on passport initialization: %o", err);
    throw err;
  }
};
