import axios from 'axios';
import passport, { PassportStatic } from 'passport';
import Container from 'typedi';
import { InternalOAuthError, VerifyCallback } from 'passport-oauth2';
import { Strategy } from 'passport-oauth2';

import config from '../config';
import logger from './logger';
import { Participant } from '../models/participant';
import { randomIdGenerator } from '../utils';

type DiscordProfile = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  local?: string;
  verified?: true;
  email?: string;
  flags?: number;
  premium_type?: number;
};

export default async (): Promise<PassportStatic> => {
  try {
    const discordStrategy = new Strategy(
      {
        authorizationURL: config.discord.discordAuthorizationURL,
        tokenURL: 'https://discordapp.com/api/oauth2/token',
        clientID: config.discord.discordOAuthClientId,
        clientSecret: config.discord.discordOAuthClientSecret,
        callbackURL: 'http://localhost:3000/api/auth/discord/redirect'
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: DiscordProfile,
        done: VerifyCallback
      ) => {
        const participantModel = Container.get<typeof Participant>(
          'Participant'
        );
        return participantModel
          .findOrCreate({
            where: { email: profile.email },
            defaults: {
              participantId: randomIdGenerator(),
              email: profile.email,
              age: 18,
              password: 'test123', // deprecated column
              name: profile.username,
              sex: 'male', // deprecated column
              discordUsername: profile.username,
              lastLogin: new Date()
            }
          })
          .then((participantRecord) => {
            const result = {
              ...participantRecord[0].toJSON(),
              accessToken,
              refreshToken,
              discordId: profile.id
            };
            done(null, result);
          })
          .catch((err) => {
            logger.error(err);
            done(null, { error: 'Deserialization error' });
          });
      }
    );

    discordStrategy.userProfile = (
      accessToken: string,
      done: Function
    ): void => {
      axios
        .get<DiscordProfile>('https://discordapp.com/api/users/@me', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(({ data }) => {
          done(null, data);
        })
        .catch((err) => {
          done(new InternalOAuthError('Failed to fetch Discord profile.', err));
        });
    };

    passport.serializeUser(function (user: object, done: Function) {
      done(null, user);
      return;
    });

    passport.deserializeUser((user: object, done: Function) => {
      done(null, user);
    });

    passport.use(discordStrategy);
    logger.info('✌️ Passport initialized!');

    return passport;
  } catch (e) {
    logger.error('🔥 Error on passport initialization: %o', e);
    throw e;
  }
};
