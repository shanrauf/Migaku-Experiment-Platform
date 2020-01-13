import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // port: parseInt(process.env.PORT, 10),
  port: process.env.NODE_ENV === 'development' ? 3000 : 3306,
  jwtSecret: process.env.JWT_SECRET,
  discordOAuthClientId: process.env.discordOAuthClientId,
  discordOAuthClientSecret: process.env.discordOAuthClientSecret,
  discordAuthorizationURL:
    'https://discordapp.com/api/oauth2/authorize?client_id=665375286031810571&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email%20guilds%20guilds.join%20gdm.join',
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
  }
};
