import dotenv from 'dotenv';

if (!dotenv.config()) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const devOrTest =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

export default {
  port: 3000,
  cookieKey: process.env.JWT_SECRET,
  MAILER_KEY: process.env.MAILER_KEY,
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api'
  },
  discord: {
    DISCORD_SERVER: devOrTest
      ? process.env.DISCORD_SERVER_DEV
      : process.env.DISCORD_SERVER,
    DISCORD_TOKEN: devOrTest
      ? process.env.DISCORD_TOKEN_DEV
      : process.env.DISCORD_TOKEN,
    discordOAuthClientId: process.env.discordOAuthClientId,
    discordCallbackUrl: devOrTest
      ? 'http://localhost:3000/api/auth/discord/redirect'
      : process.env.DISCORD_CALLBACK_URL,
    discordOAuthClientSecret: process.env.discordOAuthClientSecret,
    discordAuthorizationURL: devOrTest
      ? 'https://discordapp.com/oauth2/authorize?client_id=665375286031810571&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email%20guilds'
      : 'https://discordapp.com/oauth2/authorize?client_id=665375286031810571&permissions=8&redirect_uri=https%3A%2F%2Ftrials.massimmersionapproach.com&response_type=code&scope=identify%20email%20guilds'
  }
};
