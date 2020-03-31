import axios from 'axios';
import passport, { PassportStatic } from 'passport';
import Container from 'typedi';
import OAuth2Strategy, {
  InternalOAuthError,
  VerifyCallback
} from 'passport-oauth2';
import { Strategy } from 'passport-oauth2';

import config from '../config';
import logger from './logger';
import { Participant } from '../models/participant';
import { randomIdGenerator } from '../utils';
import DiscordClient from '../services/discord/discord';
import ExperimentService from '../api/routes/experiments/service';

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

class MockStrategy extends passport.Strategy {
  _user: object;
  _cb: Function;

  constructor(name, strategyCallback) {
    if (!name || name.length === 0) {
      throw new TypeError('MockStrategy requires a Strategy name');
    }
    super();
    this.name = name;
    this._user = {};
    this._cb = strategyCallback;
  }
  authenticate(req, options) {
    this._cb(null, null, this._user, (error, user) => {
      this.success(user);
    });
  }
  authorizationParams(): object {
    return {};
  }
  tokenParams(): object {
    return {};
  }
}

const mockStrategy = new MockStrategy("mock", ())

export default async (): Promise<PassportStatic> => {
  try {
    const discordStrategy = new Strategy(
      {
        authorizationURL: config.discord.discordAuthorizationURL,
        tokenURL: 'https://discordapp.com/api/oauth2/token',
        clientID: config.discord.discordOAuthClientId,
        clientSecret: config.discord.discordOAuthClientSecret,
        callbackURL: config.discord.discordCallbackUrl
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
              discordId: profile.id,
              profilePhoto: profile.avatar
            };

            /**
             * TODO: remove discordUsername from participant model since can ask Discord for the updated version
             */
            result['discordUsername'] = profile.username;
            const discordService = Container.get(DiscordClient);
            discordService
              .IsMemberOfMIADiscord(result.discordId)
              .then((isMemberOfMIADiscord) => {
                result['miaDiscord'] = isMemberOfMIADiscord;
                /**
                 * TODO: FIX. Ppl should register for experiments on teh website when it's styled...
                 */
                const experimentService = Container.get(ExperimentService);
                if (isMemberOfMIADiscord && participantRecord[1]) {
                  experimentService
                    .RegisterParticipant(
                      'mia-community-census',
                      participantRecord[0].participantId
                    )
                    .then(() => {
                      done(null, result);
                    });
                } else {
                  done(null, result);
                }
              });
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

    passport.use();
    logger.info('✌️ Passport initialized!');

    return passport;
  } catch (e) {
    logger.error('🔥 Error on passport initialization: %o', e);
    throw e;
  }
};
